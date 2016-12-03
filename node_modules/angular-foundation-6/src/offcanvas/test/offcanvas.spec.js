import angular from "angular";
import mocks from "angular-mocks";

import "src/offcanvas/offcanvas.js"

describe('offcanvas directive', function () {

  var inject = mocks.inject;
  var module = mocks.module;

  var $rootScope;
  var element;
  var $compile;
  var left;
  var right;
  var inner;

  beforeEach(module('mm.foundation.offcanvas'));
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.value = 22;
    element = $compile(`
        <div class="off-canvas-wrapper">
            <div class="off-canvas-wrapper-inner">
                <div class="title-bar">
                    <div class="title-bar-left">
                        <a class="left-off-canvas-toggle menu-icon" ><span></span></a>
                        <span class="title-bar-title">Foundation</span>
                    </div>

                    <div class="title-bar-right">
                        <a class="right-off-canvas-toggle menu-icon" ><span></span></a>
                    </div>

                </div>

                <div class="off-canvas position-left">
                    left
                    <ul class="off-canvas-list">
                        <li><a href="#">Left Sidebar</a></li>
                    </ul>
                </div>
                <div class="off-canvas position-right">
                    right
                    <ul class="off-canvas-list">
                        <li><a href="#">Right Sidebar</a></li>
                    </ul>
                </div>
                <div class="off-canvas-content">
                    <div>The quick brown fox.</div>
                </div>
            </div>
        </div>
    `)($rootScope);

    left = angular.element(element[0].querySelector('.position-left'));
    right = angular.element(element[0].querySelector('.position-right'));
    inner = angular.element(element[0].querySelector('.off-canvas-wrapper-inner'));
    $rootScope.$digest();
  }));

  beforeEach(inject(function ($rootScope) {
    jasmine.addMatchers({
      leftOpen: function(util, customEqualityTesters) {
        function compare(actual){
          return {
            pass: inner.hasClass('is-open-left') && left.hasClass('is-open'),
          };
        }
        return {compare: compare};
      },
      rightOpen: function(util, customEqualityTesters) {
        function compare(actual){
          return {
            pass: inner.hasClass('is-open-right') && right.hasClass('is-open'),
          };
        }
        return {compare: compare};
      },
      isClosed: function(util, customEqualityTesters) {
        function compare(actual){
          return {
            pass: !inner.hasClass('is-open-left') && !inner.hasClass('is-open-right'),
          };
        }
        return {compare: compare};
      }
    });
  }));


  it('has left aside open on click', function() {
    element[0].querySelector('.left-off-canvas-toggle').click();
    expect(element).leftOpen();
  });

  it('has right aside open on click', function() {
    element[0].querySelector('.right-off-canvas-toggle').click();
    expect(element).rightOpen();
  });

  it('is closes after clicking on the overlay', function() {
    element[0].querySelector('.right-off-canvas-toggle').click();
    expect(element).rightOpen();
  });

  // it('is closes after clicking on a list item', function() {
  //   element[0].querySelector('.right-off-canvas-toggle').click();
  //   expect(element).rightOpen();
  //   element[0].querySelector('.off-canvas-list').click();
  //   expect(element).isClosed();
  // });

});
