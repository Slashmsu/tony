import angular from "angular";
import mocks from "angular-mocks";

import "src/modal/modal.js"
import "src/modal/window.html.js"
import "src/modal/backdrop.html.js"

describe('modal window', function() {

    var inject = mocks.inject;
    var module = mocks.module;

    var $rootScope, $compile;

    beforeEach(module('mm.foundation.modal'));
    beforeEach(module('template/modal/window.html'));
    beforeEach(inject(function(_$rootScope_, _$compile_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
    }));

    it('should support custom CSS classes as string', function() {
        var windowEl = $compile('<div modal-window window-class="test">content</div>')($rootScope);
        $rootScope.$digest();

        expect(windowEl).toHaveClass('test');
    });
});
