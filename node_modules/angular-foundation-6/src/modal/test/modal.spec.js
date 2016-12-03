import angular from 'angular';
import 'angular-animate';
import mocks from 'angular-mocks';

import 'src/mediaQueries/mediaQueries.js';
import 'src/modal/modal.js';
import 'src/modal/window.html.js';
import 'src/modal/backdrop.html.js';

describe('$modal', () => {
    const inject = mocks.inject;
    const module = mocks.module;

    let $rootScope;
    let $document;
    let $compile;
    let $templateCache;
    let $timeout;
    let $q;
    let $window;
    let $provide;
    let $controllerProvider;
    let $modal;
    let $modalProvider;
    let mockWindow;
    let mockComputedStyle;
    let $animate;

    const triggerKeyDown = (element, keyCode) => {
        const evt = {
            type: 'keydown',
            which: keyCode,
        };
        element.triggerHandler(evt);
    };

    beforeEach(module('ngAnimate'));
    beforeEach(module('ngAnimateMock'));

    beforeEach(module('mm.foundation.modal'));
    beforeEach(module('template/modal/backdrop.html'));
    beforeEach(module('template/modal/window.html'));
    beforeEach(module((_$controllerProvider_, _$modalProvider_, $provide) => {
        $controllerProvider = _$controllerProvider_;
        $modalProvider = _$modalProvider_;

        const mockdocument = angular.element(document);
        $provide.value('$document', mockdocument);

        mockComputedStyle = {
            top: 0,
        };

        mockWindow = {
            location: 'val',
            document: mockdocument,
            pageYOffset: 4,
            this_is_a_mock_window: true,
            getComputedStyle:
                jasmine.createSpy('$window.getComputedStyle').and.returnValue(mockComputedStyle),
            innerWidth: 1024,
            innerHeight: 800,
            addEventListener: angular.noop,
            removeEventListener: angular.noop,
        };
        $provide.value('$window', mockWindow);
    }));

    beforeEach(inject((_$rootScope_, _$document_, _$compile_, _$templateCache_, _$timeout_, _$q_, _$modal_, _$window_, _$animate_) => {
        $rootScope = _$rootScope_;
        $document = _$document_;
        $compile = _$compile_;
        $templateCache = _$templateCache_;
        $timeout = _$timeout_;
        $q = _$q_;
        $modal = _$modal_;
        $animate = _$animate_;
        $window = _$window_;
    }));

    beforeEach(inject(($rootScope) => {
        jasmine.addMatchers({
            toBeResolvedWith: (util, customEqualityTesters) => {
                function compare(actual, expected) {
                    let resolved;
                    actual.then((result) => {
                        resolved = result;
                    });

                    $rootScope.$digest();

                    return {
                        pass: resolved === expected,
                        message: `Expected '${angular.mock.dump(actual)}' to be resolved with '${expected}' instead of '${angular.mock.dump(resolved)}'.`
                    };
                }

                return {
                    compare,
                };
            },
            toBeRejectedWith: (util, customEqualityTesters) => {
                function compare(actual, expected) {
                    let rejected;
                    actual.then(angular.noop, (reason) => {
                        rejected = reason;
                    });
                    $rootScope.$digest();

                    return {
                        pass: rejected === expected,
                        message: `Expected '${angular.mock.dump(actual)}' to be rejected with '${expected}' not '${angular.mock.dump(rejected)}'.`
                    };
                }

                return {
                    compare,
                };
            },

            /**
             * If you have  <div class="reveal ..." style="... ; mystyle: fred ...">
             *
             *  call toHaveModalOpenWithStyle('mystyle', 'fred')
             *
             *  @param style style name to find in target div
             *  @param value style value to test in target div
             *  @return true when style="mystyle" value is correct.
             *
             */

            toHaveModalOpenWithStyle: (util, customEqualityTesters) => {

                function compare(actual, style, expected) {
                    const modalDomEls = actual[0].querySelector('body div.reveal');
                    const passed = getComputedStyle(modalDomEls)[style] === expected;
                    return {
                        pass: passed,
                        message: `Expected '${angular.mock.dump(modalDomEls)}' to have a style ${style} with value ${expected}.`
                    };
                }

                return {
                    compare,
                };
            },

            toHaveModalOpenWithContent: (util, customEqualityTesters) => {

                function compare(actual, content, selector) {
                    const modalDomEls = actual[0].querySelector('body div.reveal > div');
                    const contentToCompare = selector ? modalDomEls.querySelector(selector) : modalDomEls;
                    const passed = getComputedStyle(modalDomEls).display === 'block' && contentToCompare.innerHTML == content;
                    return {
                        pass: passed,
                        message: `Expected '${angular.mock.dump(modalDomEls)}' to be open with '${content}'.`,
                    };
                }

                return {
                    compare,
                };
            },

            toHaveModalsOpen: (util, customEqualityTesters) => {

                function compare(actual, noOfModals) {
                    const modalDomEls = actual[0].querySelectorAll('body div.reveal');
                    return {
                        pass: modalDomEls.length === noOfModals,
                    };
                }

                return {
                    compare,
                };
            },

            toHaveBackdrop: (util, customEqualityTesters) => {

                function compare(actual) {
                    const backdropDomEls = actual[0].querySelectorAll('body > div.reveal-overlay');
                    return {
                        pass: backdropDomEls.length === 1,
                        message: `Expected '${angular.mock.dump(backdropDomEls)}' to be a backdrop element'.`,
                    };
                }

                return {
                    compare,
                };
            },

            // toHaveModalOpenInOtherParent: (util, customEqualityTesters) => {

            //     function compare(actual, parentSelector) {
            //         const modalElem = actual[0].querySelectorAll(parentSelector + ' > .reveal');
            //         let passed = modalElem.length === 1;
            //         return {
            //             pass: passed,
            //             message: 'Expected modal to be a parent of: ' + parentSelector
            //         };
            //     }

            //     return {
            //         compare,
            //     };
            // },
        });
    }));

    afterEach(() => {
        let body = $document[0].querySelector('body');
        const modals = angular.element(body.querySelectorAll('div.reveal'));
        let bgs = angular.element(body.querySelectorAll('div.reveal-overlay'));

        modals.remove();
        bgs.remove();

        if (body.classList) {
            body.classList.remove('is-reveal-open');
        } else {
            const regex = new RegExp('(^|\\b)' + 'is-reveal-open'.split(' ').join('|') + '(\\b|$)', 'gi');
            body.className = body.className.replace(regex, ' ');
        }

    });

    function open(modalOptions) {
        const modal = $modal.open(modalOptions);
        $rootScope.$digest();
        $timeout.flush();
        try{
            $animate.flush();
        } catch(e){}
        return modal;
    }

    function close(modal, result) {
        modal.close(result);
        $rootScope.$digest();
        try{
            $animate.flush();
        } catch(e){}
    }

    function dismiss(modal, reason) {
        modal.dismiss(reason);
        $rootScope.$digest();
        try{
            $animate.flush();
        } catch(e){}
    }

    // describe('modal invoked with y offsets', () => {
    //     it('should create the modal at the correct location based on window y position', () => {
    //         $window.pageYOffset = 400;

    //         const modal = open({
    //             template: '<div>Content</div>'
    //         });
    //         expect($document).toHaveModalsOpen(1);
    //         expect($document).toHaveModalOpenWithStyle('top', '400px');
    //     });
    // });

    describe('basic scenarios with default options', () => {
        it('should open and dismiss a modal with a minimal set of options', () => {
            const modal = open({
                template: '<div>Content</div>',
            });
            expect($document).toHaveModalsOpen(1);
            expect($document).toHaveModalOpenWithContent('Content', 'div');
            expect($document).toHaveBackdrop();

            dismiss(modal, 'closing in test');

            expect($document).toHaveModalsOpen(0);
            expect($document).not.toHaveBackdrop();
        });

        it('should not throw an exception on a second dismiss', () => {
            const modal = open({
                template: '<div>Content</div>',
            });
            expect($document).toHaveModalsOpen(1);
            expect($document).toHaveModalOpenWithContent('Content', 'div');
            expect($document).toHaveBackdrop();

            dismiss(modal, 'closing in test');

            expect($document).toHaveModalsOpen(0);

            dismiss(modal, 'closing in test');
        });

        it('should not throw an exception on a second close', () => {
            const modal = open({
                template: '<div>Content</div>',
            });

            expect($document).toHaveModalsOpen(1);
            expect($document).toHaveModalOpenWithContent('Content', 'div');
            expect($document).toHaveBackdrop();

            close(modal, 'closing in test');

            expect($document).toHaveModalsOpen(0);

            close(modal, 'closing in test');
        });

        it('should open a modal from templateUrl', () => {
            $templateCache.put('content.html', '<div>URL Content</div>');
            const modal = open({
                templateUrl: 'content.html',
            });
            expect($document).toHaveModalsOpen(1);
            expect($document).toHaveModalOpenWithContent('URL Content', 'div');
            expect($document).toHaveBackdrop();

            dismiss(modal, 'closing in test');

            expect($document).toHaveModalsOpen(0);
            expect($document).not.toHaveBackdrop();
        });

        it('should support closing on ESC', () => {
            const modal = open({
                template: '<div>Content</div>',
            });

            expect($document).toHaveModalsOpen(1);

            triggerKeyDown($document, 27);
            // $timeout.flush();
            $rootScope.$digest();

            expect($document).toHaveModalsOpen(0);
        });

        it('should support closing on backdrop click', () => {
            const modal = open({
                template: '<div>Content</div>',
            });

            expect($document).toHaveModalsOpen(1);

            $document[0].querySelector('body div.reveal-overlay').click();
            // $timeout.flush();
            $rootScope.$digest();

            expect($document).toHaveModalsOpen(0);
        });

        it('should resolve returned promise on close', () => {
            const modal = open({
                template: '<div>Content</div>',
            });

            close(modal, 'closed ok');
            expect(modal.result).toBeResolvedWith('closed ok');
        });

        it('should reject returned promise on dismiss', () => {
            const modal = open({
                template: '<div>Content</div>',
            });

            dismiss(modal, 'esc');
            expect(modal.result).toBeRejectedWith('esc');
        });


        it('should expose a promise linked to the templateUrl / resolve promises', () => {
            const modal = open({
                template: '<div>Content</div>',
                resolve: {
                    ok: () => $q.resolve('ok')
                },
            });

            expect(modal.opened).toBeResolvedWith(true);
        });

        it('should expose a promise linked to the templateUrl / resolve promises and reject it if needed', () => {
            const modal = open({
                template: '<div>Content</div>',
                resolve: {
                    ok: () => $q.reject('ko'),
                },
            });

            expect(modal.opened).toBeRejectedWith(false);
        });

        it('should destroy modal scope on close', () => {
            expect($rootScope.$$childTail).toEqual(null);

            const modal = open({
                template: '<div>Content</div>',
            });

            expect($rootScope.$$childTail).not.toEqual(null);
            close(modal, 'closed ok');
            expect($document).toHaveModalsOpen(0);
            expect($rootScope.$$childTail).toEqual(null);
        });

        // describe("$modalInstance.reposition()", () => {
        //     it('should re-calculate the modal margin top', () => {
        //         $window.pageYOffset = 400;
        //         const modal = open({
        //             template: '<div>Content</div>'
        //         });

        //         expect($document).toHaveModalOpenWithStyle('top', '400px');

        //         $window.pageYOffset = 500;
        //         modal.reposition();
        //         expect($document).toHaveModalOpenWithStyle('top', '500px');
        //     });
        // });
    });

    describe('default options can be changed in a provider', () => {
        it('should allow overriding default options in a provider', () => {
            $modalProvider.options.backdrop = false;
            const modal = open({
                template: '<div>Content</div>',
            });

            expect($document).toHaveModalOpenWithContent('Content', 'div');
            expect($document).not.toHaveBackdrop();
        });

        it('should accept new objects with default options in a provider', () => {
            $modalProvider.options = {
                backdrop: false,
            };
            const modal = open({
                template: '<div>Content</div>',
            });

            expect($document).toHaveModalOpenWithContent('Content', 'div');
            expect($document).not.toHaveBackdrop();
        });
    });

    describe('option by option', () => {
        describe('template and templateUrl', () => {
            it('should throw an error if none of template and templateUrl are provided', () => {
                expect(() => {
                    const modal = open({});
                }).toThrow(new Error('One of template or templateUrl options is required.'));
            });

            it('should not fail if a templateUrl contains leading / trailing white spaces', () => {

                $templateCache.put('whitespace.html', '  <div>Whitespaces</div>  ');
                const modal = open({
                    templateUrl: 'whitespace.html',
                });

                expect($document).toHaveModalOpenWithContent('Whitespaces', 'div');
            });
        });

        describe('controller', () => {
            it('should accept controllers and inject modal instances', () => {
                let TestCtrl = function($scope, $modalInstance) {
                    $scope.fromCtrl = 'Content from ctrl';
                    $scope.isModalInstance = angular.isObject($modalInstance) && angular.isFunction($modalInstance.close);
                };

                const modal = open({
                    template: '<div>{{fromCtrl}} {{isModalInstance}}</div>',
                    controller: TestCtrl
                });

                expect($document).toHaveModalOpenWithContent('Content from ctrl true', 'div');
            });

            it('should accept controller-as syntax in `controller` option', () => {
                $controllerProvider.register('TestCtrl', function($modalInstance) {
                    this.fromCtrl = 'Content from ctrl';
                    this.isModalInstance = angular.isObject($modalInstance) && angular.isFunction($modalInstance.close);
                });

                const modal = open({
                    template: '<div>{{test.fromCtrl}} {{test.isModalInstance}}</div>',
                    controller: 'TestCtrl as test',
                });

                expect($document).toHaveModalOpenWithContent('Content from ctrl true', 'div');
            });

            it('should accept `controllerAs` option', () => {
                const modal = open({
                    template: '<div>{{test.fromCtrl}} {{test.isModalInstance}}</div>',
                    controller: function($modalInstance) {
                        this.fromCtrl = 'Content from ctrl';
                        this.isModalInstance = angular.isObject($modalInstance) && angular.isFunction($modalInstance.close);
                    },
                    controllerAs: 'test',
                });

                expect($document).toHaveModalOpenWithContent('Content from ctrl true', 'div');
            });
        });

        describe('resolve', () => {
            const ExposeCtrl = ($scope, value) => {
                $scope.value = value;
            };

            function modalDefinition(template, resolve) {
                return {
                    template,
                    controller: ExposeCtrl,
                    resolve,
                };
            }

            it('should resolve simple values', () => {
                open(modalDefinition('<div>{{value}}</div>', {
                    value: () => 'Content from resolve',
                }));

                expect($document).toHaveModalOpenWithContent('Content from resolve', 'div');
            });


            it('should not open dialog (and reject returned promise) if one of resolve fails', () => {
                const deferred = $q.defer();

                const modal = open(modalDefinition('<div>{{value}}</div>', {
                    value: () => deferred.promise,
                }));

                expect($document).toHaveModalsOpen(0);

                deferred.reject('error in test');
                $rootScope.$digest();

                expect($document).toHaveModalsOpen(0);
                expect(modal.result).toBeRejectedWith('error in test');
            });

            it('should support injection with minification-safe syntax in resolve functions', () => {

                open(modalDefinition('<div>{{value.id}}</div>', {
                    value: ['$locale', (e) => e],
                }));

                expect($document).toHaveModalOpenWithContent('en-us', 'div');
            });

            //TODO: resolves with dependency injection - do we want to support them?
        });

        describe('scope', () => {
            it('should custom scope if provided', () => {
                const $scope = $rootScope.$new();
                $scope.fromScope = 'Content from custom scope';
                const modal = open({
                    template: '<div>{{fromScope}}</div>',
                    scope: $scope,
                });

                expect($document).toHaveModalOpenWithContent('Content from custom scope', 'div');
            });
        });

        // describe('parent', () => {
        //     beforeEach(() => {
        //         $document.find('body').append('<modal><modal>');
        //     });

        //     it('should use an element other than body as the parent if provided', () => {
        //         const modal = open({
        //             template: '<div>Parent other than body</div>',
        //             parent: 'modal'
        //         });

        //         expect($document).toHaveModalOpenInOtherParent('modal');
        //     });

        //     afterEach(() => {
        //         $document.find('body').find('modal').remove();
        //     });
        // });

        describe('keyboard', () => {
            it('should not close modals if keyboard option is set to false', () => {
                const modal = open({
                    template: '<div>No keyboard</div>',
                    keyboard: false,
                });

                expect($document).toHaveModalsOpen(1);
                triggerKeyDown($document, 27);
                $rootScope.$digest();
                expect($document).toHaveModalsOpen(1);
            });
        });

        describe('backdrop', () => {
            it('should not have any backdrop element if backdrop set to false', () => {
                const modal = open({
                    template: '<div>No backdrop</div>',
                    backdrop: false,
                });

                expect($document).toHaveModalOpenWithContent('No backdrop', 'div');
                expect($document).not.toHaveBackdrop();

                dismiss(modal);
                expect($document).toHaveModalsOpen(0);
            });

            it('should not close modal on backdrop click if backdrop is specified as "static"', () => {
                const modal = open({
                    template: '<div>Static backdrop</div>',
                    backdrop: 'static',
                });

                $document[0].querySelector('body div.reveal-overlay').click();
                expect($document).toHaveModalOpenWithContent('Static backdrop', 'div');
                expect($document).toHaveBackdrop();
            });
        });

        describe('custom window classes', () => {
            it('should support additional window class as string', () => {
                const modal = open({
                    template: '<div>With custom window class</div>',
                    windowClass: 'additional',
                });

                expect(angular.element($document[0].querySelector('div.reveal'))).toHaveClass('additional');
            });
        });
    });

    describe('multiple modals', () => {
        it('it should allow opening of multiple modals', () => {
            const modal1 = open({
                template: '<div>Modal1</div>',
            });

            const modal2 = open({
                template: '<div>Modal2</div>',
            });

            expect($document).toHaveModalsOpen(2);
            dismiss(modal2);
            expect($document).toHaveModalsOpen(1);
            expect($document).toHaveModalOpenWithContent('Modal1', 'div');

            dismiss(modal1);
            expect($document).toHaveModalsOpen(0);
        });

        it('should not close any modals on ESC if the topmost one does not allow it', () => {
            const modal1 = open({
                template: '<div>Modal1</div>',
            });

            const modal2 = open({
                template: '<div>Modal2</div>',
                keyboard: false,
            });

            triggerKeyDown($document, 27);
            expect($document).toHaveModalsOpen(2);
        });

        it('should not close any modals on click if a topmost modal does not have backdrop', () => {
            expect($document).toHaveModalsOpen(0);

            const modal1 = open({
                template: '<div>Modal1</div>',
            });

            const modal2 = open({
                template: '<div>Modal2</div>',
                backdrop: false,
            });

            $document[0].querySelector('body div.reveal-overlay').click();
            expect($document).toHaveModalsOpen(2);
        });

        it('multiple modals should not interfere with default options', () => {
            const modal1 = open({
                template: '<div>Modal1</div>',
                backdrop: false,
            });

            const modal2 = open({
                template: '<div>Modal2</div>',
            });

            expect($document).toHaveBackdrop();
        });

        // it('should add "is-reveal-open" class when a modal gets opened', () => {

        //     let body = $document.find('body');
        //     expect(body).not.toHaveClass('is-reveal-open');

        //     const modal1 = open({
        //         template: '<div>Content1</div>'
        //     });

        //     expect(body).toHaveClass('is-reveal-open');

        //     const modal2 = open({
        //         template: '<div>Content1</div>'
        //     });

        //     expect(body).toHaveClass('is-reveal-open');

        //     dismiss(modal1);
        //     expect(body).toHaveClass('is-reveal-open');

        //     dismiss(modal2);
        //     expect(body).not.toHaveClass('is-reveal-open');
        // });
    });
});
