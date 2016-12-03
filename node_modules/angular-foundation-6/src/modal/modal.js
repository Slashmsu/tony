angular.module('mm.foundation.modal', ['mm.foundation.mediaQueries'])

/**
 * A helper, internal data structure that acts as a map but also allows getting / removing
 * elements in the LIFO order
 */
.factory('$$stackedMap', function() {
    'ngInject';
    return {
        createNew: () => {
            const stack = [];

            return {
                add: (key, value) => {
                    stack.push({
                        key,
                        value,
                    });
                },
                get: (key) => {
                    for (let i = 0; i < stack.length; i++) {
                        if (key === stack[i].key) {
                            return stack[i];
                        }
                    }
                },
                keys: () => {
                    const keys = [];
                    for (let i = 0; i < stack.length; i++) {
                        keys.push(stack[i].key);
                    }
                    return keys;
                },
                top: () => stack[stack.length - 1],
                remove: (key) => {
                    let idx = -1;
                    for (let i = 0; i < stack.length; i++) {
                        if (key === stack[i].key) {
                            idx = i;
                            break;
                        }
                    }
                    return stack.splice(idx, 1)[0];
                },
                removeTop: () => stack.splice(stack.length - 1, 1)[0],
                length: () => stack.length,
            };
        },
    };
})

/**
 * A helper directive for the $modal service. It creates a backdrop element.
 */
.directive('modalBackdrop', ($modalStack) => {
    'ngInject';
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'template/modal/backdrop.html',
        link: (scope) => {
            scope.close = (evt) => {
                const modal = $modalStack.getTop();
                if (modal && modal.value.closeOnClick && modal.value.backdrop && modal.value.backdrop !== 'static' && (evt.target === evt.currentTarget)) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    $modalStack.dismiss(modal.key, 'backdrop click');
                }
            };
        },
    };
})

.directive('modalWindow', ($modalStack) => {
    'ngInject';
    return {
        restrict: 'EA',
        scope: {
            index: '@',
        },
        replace: true,
        transclude: true,
        templateUrl: 'template/modal/window.html',
        link: (scope, element, attrs) => {
            scope.windowClass = attrs.windowClass || '';
            scope.isTop = () => {
                const top = $modalStack.getTop();
                return top ? top.value.modalScope && top.value.modalScope === scope.$parent : true;
            };
        },
    };
})

.factory('$modalStack', ($window, $timeout, $document, $compile, $rootScope, $$stackedMap, $animate, $q, mediaQueries) => {
    'ngInject';
    const isMobile = mediaQueries.mobileSniff();
    const OPENED_MODAL_CLASS = 'is-reveal-open';
    // For modal focus
    var tabbableSelector = 'a[href], area[href], input:not([disabled]):not([tabindex=\'-1\']), ' +
        'button:not([disabled]):not([tabindex=\'-1\']),select:not([disabled]):not([tabindex=\'-1\']), textarea:not([disabled]):not([tabindex=\'-1\']), ' +
        'iframe, object, embed, *[tabindex]:not([tabindex=\'-1\']), *[contenteditable=true]';

    let originalScrollPos = null; // For mobile scroll hack
    let backdropDomEl;
    let backdropScope;
    const openedWindows = $$stackedMap.createNew();
    const $modalStack = {};

    function backdropIndex() {
        let topBackdropIndex = -1;
        const opened = openedWindows.keys();
        for (let i = 0; i < opened.length; i++) {
            if (openedWindows.get(opened[i]).value.backdrop) {
                topBackdropIndex = i;
            }
        }
        return topBackdropIndex;
    }

    $rootScope.$watch(backdropIndex, (newBackdropIndex) => {
        if (backdropScope) {
            backdropScope.index = newBackdropIndex;
        }
    });

    function resizeHandler() {
        const opened = openedWindows.keys();
        let fixedPositiong = opened.length > 0;
        const body = $document.find('body').eq(0);

        for (let i = 0; i < opened.length; i++) {
            const modalPos = $modalStack.reposition(opened[i]);
            if (modalPos && modalPos.position !== 'fixed') {
                fixedPositiong = false;
            }
        }
    }

    function removeModalWindow(modalInstance) {
        const modalWindow = openedWindows.get(modalInstance).value;

        // clean up the stack
        openedWindows.remove(modalInstance);

        // Remove backdrop
        if (backdropDomEl && backdropIndex() === -1) {
            let backdropScopeRef = backdropScope;

            $animate.leave(backdropDomEl).then(() => {
                if (backdropScopeRef){
                    backdropScopeRef.$destroy();
                }
                backdropScopeRef = null;
            });
            backdropDomEl = null;
            backdropScope = null;
        }

        // Remove modal
        if (openedWindows.length() === 0) {
            const body = $document.find('body').eq(0);
            body.removeClass(OPENED_MODAL_CLASS);

            if (isMobile) {
                const html = $document.find('html').eq(0);
                html.removeClass(OPENED_MODAL_CLASS);
                if (originalScrollPos) {
                    body[0].scrollTop = originalScrollPos;
                    originalScrollPos = null;
                }
            }
            angular.element($window).unbind('resize', resizeHandler);
        }

        // remove window DOM element
        $animate.leave(modalWindow.modalDomEl).then(() => {
            modalWindow.modalScope.$destroy();
        });
    }

    function isVisible(element) {
        return !!(element.offsetWidth ||
            element.offsetHeight ||
            element.getClientRects().length);
    }

    function getModalCenter(modalInstance) {
        const options = modalInstance.options;

        if (options.backdrop) {
            return { left: 0, position: 'relative' };
        }

        const el = options.modalDomEl;
        const body = $document.find('body').eq(0);

        const windowWidth = body.clientWidth || $document[0].documentElement.clientWidth;
        const windowHeight = body.clientHeight || $document[0].documentElement.clientHeight;

        const width = el[0].offsetWidth;
        const height = el[0].offsetHeight;

        const left = parseInt((windowWidth - width) / 2, 10);

        let top = 0;
        if (height < windowHeight) {
            top = parseInt((windowHeight - height) / 4, 10);
        }

        const modalPos = options.modalPos = options.modalPos || {};

        modalPos.left = left;
        modalPos.position = 'fixed';

        return modalPos;
    }

    $document.on('keydown', (evt) => {
        const modal = openedWindows.top();
        if (modal) {
            if (evt.which === 27) {
                if (modal.value.keyboard) {
                    $rootScope.$apply(() => {
                        $modalStack.dismiss(modal.key);
                    });
                }
            } else if (evt.which === 9) {
                let list = $modalStack.loadFocusElementList(modal);
                let focusChanged = false;
                if (evt.shiftKey) {
                    if ($modalStack.isFocusInFirstItem(evt, list) || $modalStack.isModalFocused(evt, modal)) {
                        focusChanged = $modalStack.focusLastFocusableElement(list);
                    }
                } else {
                    if ($modalStack.isFocusInLastItem(evt, list)) {
                        focusChanged = $modalStack.focusFirstFocusableElement(list);
                    }
                }

                if (focusChanged) {
                    evt.preventDefault();
                    evt.stopPropagation();
                }
            }
        }
    });

    $modalStack.loadFocusElementList = function(modalWindow) {
        if (modalWindow) {
            var modalDomE1 = modalWindow.value.modalDomEl;
            if (modalDomE1 && modalDomE1.length) {
            var elements = modalDomE1[0].querySelectorAll(tabbableSelector);
            return elements ?
                Array.prototype.filter.call(elements, function(element) {
                return isVisible(element);
                }) : elements;
            }
        }
    };

    $modalStack.isModalFocused = function(evt, modalWindow) {
        if (evt && modalWindow) {
            var modalDomEl = modalWindow.value.modalDomEl;
            if (modalDomEl && modalDomEl.length) {
                return (evt.target || evt.srcElement) === modalDomEl[0];
            }
        }
        return false;
    };

    $modalStack.isFocusInLastItem = function(evt, list) {
        if (list.length > 0) {
            return (evt.target || evt.srcElement) === list[list.length - 1];
        }
        return false;
    };

    $modalStack.focusFirstFocusableElement = function(list) {
        if (list.length > 0) {
            list[0].focus();
            return true;
        }
        return false;
    };

    $modalStack.focusLastFocusableElement = function(list) {
        if (list.length > 0) {
            list[list.length - 1].focus();
            return true;
        }
        return false;
    };

    $modalStack.isFocusInFirstItem = function(evt, list) {
        if (list.length > 0) {
            return (evt.target || evt.srcElement) === list[0];
        }
        return false;
    };

    $modalStack.open = (modalInstance, options) => {
        modalInstance.options = {
            deferred: options.deferred,
            modalScope: options.scope,
            backdrop: options.backdrop,
            keyboard: options.keyboard,
            closeOnClick: options.closeOnClick,
            id: options.id,
        };
        openedWindows.add(modalInstance, modalInstance.options);

        const currBackdropIndex = backdropIndex();

        if (currBackdropIndex >= 0 && !backdropDomEl) {
            backdropScope = $rootScope.$new(true);
            backdropScope.index = currBackdropIndex;
            backdropDomEl = $compile('<div modal-backdrop></div>')(backdropScope);
        }

        if (openedWindows.length() === 1) {
            angular.element($window).on('resize', resizeHandler);
        }

        const classes = [];
        if (options.windowClass) {
            classes.push(options.windowClass);
        }

        if (options.size) {
            classes.push(options.size);
        }

        if (!options.backdrop) {
            classes.push('without-overlay');
        }

        const modalDomEl = angular.element('<div modal-window></div>').attr({
            style: `
                visibility: visible;
                z-index: -1;
                display: block;
            `,
            'window-class': classes.join(' '),
            index: openedWindows.length() - 1,
        });

        modalDomEl.html(options.content);
        $compile(modalDomEl)(options.scope);
        openedWindows.top().value.modalDomEl = modalDomEl;

        return $timeout(() => {
            // let the directives kick in
            options.scope.$apply();

            // Attach, measure, remove
            const body = $document.find('body').eq(0);
            body.prepend(modalDomEl);
            const modalPos = getModalCenter(modalInstance, true);
            modalDomEl.detach();

            modalDomEl.attr({
                style: `
                    visibility: visible;
                    left: ${modalPos.left}px;
                    display: block;
                    position: ${modalPos.position};
                `,
            });

            const promises = [];

            if (backdropDomEl) {
                promises.push($animate.enter(backdropDomEl, body, body[0].lastChild));
            }

            const modalParent = backdropDomEl || body;

            promises.push($animate.enter(modalDomEl, modalParent, modalParent[0].lastChild));

            if (isMobile) {
                originalScrollPos = $window.pageYOffset;
                const html = $document.find('html').eq(0);
                html.addClass(OPENED_MODAL_CLASS);
            }

            body.addClass(OPENED_MODAL_CLASS);

            // Only for no backdrop modals
            if (!options.backdrop) {
                options.scope.$watch(() => Math.floor(modalDomEl[0].offsetHeight / 10), resizeHandler);
            }

            return $q.all(promises).then(() => {
                const focusedElem = (modalDomEl[0].querySelector('[autofocus]') || modalDomEl[0]);
                const y = modalParent[0].scrollTop;
                focusedElem.focus();
                modalParent[0].scrollTop = y;
            });
        });
    };

    $modalStack.reposition = (modalInstance) => {
        const modalWindow = openedWindows.get(modalInstance).value;
        if (modalWindow) {
            const modalDomEl = modalWindow.modalDomEl;
            const modalPos = getModalCenter(modalInstance);
            modalDomEl.css('left', `${modalPos.left}px`);
            modalDomEl.css('position', modalPos.position);
            return modalPos;
        }
        return {};
    };

    $modalStack.close = (modalInstance, result) => {
        const modalWindow = openedWindows.get(modalInstance);
        if (modalWindow) {
            modalWindow.value.deferred.resolve(result);
            return modalInstance.opened.then(() => {
                removeModalWindow(modalInstance);
            });
        }
        return $q.resolve();
    };

    $modalStack.dismiss = (modalInstance, reason) => {
        const modalWindow = openedWindows.get(modalInstance);
        if (modalWindow) {
            modalWindow.value.deferred.reject(reason);
            return modalInstance.opened.then(() => {
                removeModalWindow(modalInstance);
            });
        }
        return $q.resolve();
    };

    $modalStack.dismissAll = (reason, leaveOpenIds = []) =>
        $q.all(openedWindows.keys().filter(key =>
            leaveOpenIds.indexOf(openedWindows.get(key).value.id) === -1
        ).map(key =>
            $modalStack.dismiss(key, reason)
        ));

    $modalStack.getTop = () => openedWindows.top();

    $modalStack.isOpen = (id) => openedWindows.keys().some(key =>
            skipIds.indexOf(openedWindows.get().value.id) !== -1
        );

    return $modalStack;
})

.provider('$modal', function() {
    'ngInject';

    this.options = {
        backdrop: true, // can be also false or 'static'
        keyboard: true,
        closeOnClick: true,
        id: 0,
    };

    this.$get = ($injector, $rootScope, $q, $http, $templateCache, $controller, $modalStack) => {
        'ngInject';

        const $modal = {};

        function getTemplatePromise(options) {
            if (options.template) {
                return $q.resolve(options.template);
            }
            return $http.get(options.templateUrl, {
                cache: $templateCache,
            }).then((result) => result.data);
        }

        function getResolvePromises(resolves) {
            const promisesArr = [];
            angular.forEach(resolves, (value) => {
                if (angular.isFunction(value) || angular.isArray(value)) {
                    promisesArr.push($q.resolve($injector.invoke(value)));
                }
            });
            return promisesArr;
        }

        $modal.open = (modalOpts) => {
            const modalResultDeferred = $q.defer();
            const modalOpenedDeferred = $q.defer();

            // prepare an instance of a modal to be injected into controllers and returned to a caller
            const modalInstance = {
                result: modalResultDeferred.promise,
                opened: modalOpenedDeferred.promise,
                close: (result) => {
                    $modalStack.close(modalInstance, result);
                },
                dismiss: (reason) => {
                    $modalStack.dismiss(modalInstance, reason);
                },
                reposition: () => {
                    $modalStack.reposition(modalInstance);
                },
            };

            // merge and clean up options
            const modalOptions = angular.extend({}, this.options, modalOpts);
            modalOptions.resolve = modalOptions.resolve || {};

            // verify options
            if (!modalOptions.template && !modalOptions.templateUrl) {
                throw new Error('One of template or templateUrl options is required.');
            }

            const templateAndResolvePromise =
                $q.all([getTemplatePromise(modalOptions)]
                    .concat(getResolvePromises(modalOptions.resolve)));

            const openedPromise = templateAndResolvePromise.then((tplAndVars) => {
                const modalScope = (modalOptions.scope || $rootScope).$new();
                modalScope.$close = modalInstance.close;
                modalScope.$dismiss = modalInstance.dismiss;

                let ctrlInstance;
                const ctrlLocals = {};
                let resolveIter = 1;

                // controllers
                if (modalOptions.controller) {
                    ctrlLocals.$scope = modalScope;
                    ctrlLocals.$modalInstance = modalInstance;
                    angular.forEach(modalOptions.resolve, (value, key) => {
                        ctrlLocals[key] = tplAndVars[resolveIter++];
                    });

                    ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
                    if (modalOptions.controllerAs) {
                        modalScope[modalOptions.controllerAs] = ctrlInstance;
                    }
                }

                return $modalStack.open(modalInstance, {
                    scope: modalScope,
                    deferred: modalResultDeferred,
                    content: tplAndVars[0],
                    backdrop: modalOptions.backdrop,
                    keyboard: modalOptions.keyboard,
                    windowClass: modalOptions.windowClass,
                    size: modalOptions.size,
                    closeOnClick: modalOptions.closeOnClick,
                    id: modalOptions.id,
                });
            }, (reason) => {
                modalResultDeferred.reject(reason);
                return $q.reject(reason);
            });

            openedPromise.then(() => {
                modalOpenedDeferred.resolve(true);
            }, () => {
                modalOpenedDeferred.reject(false);
            });

            return modalInstance;
        };
        return $modal;
    };
});
