import angular from "angular";
import mocks from "angular-mocks";
import "src/position/position.js"
import "src/mediaQueries/mediaQueries.js"
import "src/dropdownToggle/dropdownToggle.js"
import "src/dropdownToggle/dropdownToggle.html.js"

describe('dropdownToggle', function() {

  var inject = mocks.inject;
  var module = mocks.module;

  var $compile, $rootScope, $document, $location, $window, elm, toggleElm, targetElm, $scope, $timeout;

  beforeEach(module('template/dropdownToggle/dropdownToggle.html'));

  function dropdown(id, hover) {
    if (!id) {
      id = 'target';
    }
    var hoverAttr = hover ? 'toggle-on-hover="true"' : '';
    var element = angular.element(
      '<dropdown-toggle id="' + id + '" style="display: block;"' + hoverAttr + '>' +
        '<toggle><a>dropdown-toggles can also have links!</a></toggle>' +
        '<pane>' +
          '<ul>' +
            '<li>Hello</li>' +
          '</ul>' +
        '</pane>' +
      '</dropdown-toggle>'
    );
    $document.find('body').append(element);
    $compile(element)($scope);
    $rootScope.$apply();
    return element;
  }

  afterEach(function() {
    if (elm) {
      elm.remove();
    }
  });

  beforeEach(module('mm.foundation.dropdownToggle'));

  beforeEach(inject(function() {
    jasmine.addMatchers({
      // Deal with UAs that do subpixel layout
      toBeRounded: function(util, customEqualityTesters) {
        function compare(actual, expected, unit){

          var actualRounded = Math.round(Number(unit ? actual.replace(unit, '') : actual));
          var expectedRounded = Math.round(Number(unit ? String(expected).replace(unit, '') : expected));
          var passed = actualRounded === expectedRounded;

          return {
            pass: passed,
            message: "Expected '" + angular.mock.dump(actual) + "' to round to '" + expectedRounded + "'."
          };
        }

        return {compare: compare};
      }
    });
  }));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$document_, _$location_, _$window_, _$timeout_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $document = _$document_;
    $window = _$window_;
    $location = _$location_;
    $timeout = _$timeout_;
    $scope = $rootScope.$new();
  }));

  describe('with a single dropdown', function() {
    beforeEach(function() {
      elm = dropdown();
      toggleElm = elm.find('toggle');
      targetElm = angular.element(elm[0].querySelector('.dropdown-pane'));

    });

    it('should initially hide the target element', function() {
      expect(targetElm.hasClass('is-open')).toBe(false);
    });

    it('should toggle on `toggle` click', function() {
      expect(targetElm.hasClass('is-open')).toBe(false);
      toggleElm[0].click();
      expect(targetElm.hasClass('is-open')).toBe(true);
      toggleElm[0].click();
      expect(targetElm.hasClass('is-open')).toBe(false);
    });

    it('should close on elm click', function() {

      var evt = document.createEvent('HTMLEvents');
      evt.initEvent('click', true, false);
      toggleElm[0].click();

      // evt = document.createEvent('HTMLEvents');
      // evt.initEvent('click', true, false);
      toggleElm[0].click();

      expect(targetElm.hasClass('is-open')).toBe(false);
    });

    // it('should close on body click', function() {
    //   toggleElm[0].click();
    //   expect(targetElm.hasClass('is-open')).toBe(true);
    //   $document[0].querySelector('body').click();
    //   expect(targetElm.hasClass('is-open')).toBe(false);
    // });

    // it('should close on $location change', function() {
    //   toggleElm[0].click();
    //   $location.path('/foo');
    //   $rootScope.$apply();
    //   expect(targetElm.css('display')).toBe('none');
    // });

    it("should add/remove the 'is-open' class on toggle", function() {
      toggleElm[0].click();
      expect(targetElm.hasClass('is-open')).toBe(true);
      toggleElm[0].click();
      expect(targetElm.hasClass('is-open')).toBe(false);
    });
  });

  describe('with hover enabled', function() {
    beforeEach(function() {
      elm = dropdown(1, true);
      toggleElm = elm.find('span');
      targetElm = angular.element(elm[0].querySelector('.dropdown-pane'));
    });

    it('should add/remove the "is-open" class on hover', function() {
      toggleElm.triggerHandler('mouseover');
      $scope.$apply();
      expect(targetElm.hasClass('is-open')).toBe(true);
      toggleElm.triggerHandler('mouseleave');
      $scope.$apply();
      $timeout(function() {
        expect(targetElm.hasClass('is-open')).toBe(false);
      }, 250);
    });

    it('should not remove the "is-open" class when moving to pane', function() {
      toggleElm.triggerHandler('mouseover');
      $scope.$apply();
      targetElm.triggerHandler('mouseover');
      $scope.$apply();
      $timeout(function() {
        expect(targetElm.hasClass('is-open')).toBe(true);
      }, 250);
    });
  });

  // describe('with multiple dropdowns', function() {
  //   it('should only allow one dropdown to be open at once', function() {
  //     var elm1 = dropdown('target1');
  //     var elm2 = dropdown('target2');
  //     elm1[0].querySelector('toggle').click();
  //     elm2[0].querySelector('toggle').click();
  //     expect(elm1.find('ul').hasClass('is-open')).toBe(false);
  //     expect(elm2.find('ul').hasClass('is-open')).toBe(true);
  //     elm1.remove();
  //     elm2.remove();
  //   });
  // });

  // describe('on a mobile device', function() {
  //   var trueFn = Boolean.bind(null, true);
  //   var falseFn = Boolean.bind(null, false);

  //   angular.module('mm.foundation.dropdownToggle')
  //     .factory('mediaQueries', function() {
  //       return {small: trueFn, medium: falseFn, large: falseFn };
  //     });

  //   it('should be full-width', function() {
  //     elm = dropdown('responsive');
  //     toggleElm = elm.find('a');
  //     targetElm = elm.find('ul');

  //     toggleElm[0].click();

  //     expect(getComputedStyle(targetElm[0])['position']).toBe('absolute');
  //     expect(getComputedStyle(targetElm[0])['max-width']).toBe('none');

  //     var expectedWidth = $window.innerWidth * 0.95;
  //     expect(getComputedStyle(targetElm[0])['width']).toBeRounded(expectedWidth, 'px');
  //   });
  // });

  // describe('when the parent element has a "has-dropdown" class', function() {
  //   beforeEach(function() {
  //     element = angular.element(
  //       '<div class="has-dropdown"><a dropdown-toggle="#target">Trigger</a>' +
  //         '<ul id="target"><li>hello</li></ul>' +
  //       '</div>'
  //     );

  //     $document.find('body').append(element);

  //     elm = $compile(element)($scope);
  //     $scope.$digest();
  //     toggleElm = elm.find('a');
  //     targetElm = elm.find('ul');
  //   });

  //   it('adds the "hover" class to the containing has-dropdown element', function() {
  //     toggleElm[0].click();
  //     $scope.$digest();
  //     expect(elm.hasClass('hover')).toBe(true);
  //   });
  // });
});
