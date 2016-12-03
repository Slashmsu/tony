import angular from "angular";
import mocks from "angular-mocks";
import "src/abide/abide.js"
import "src/abide/abide.html.js"

// describe('abide', function() {

//     var inject = mocks.inject;
//     var module = mocks.module;

//     var $scope;

//     beforeEach(module('mm.foundation.abide'));
//     beforeEach(module('template/abide/abide.html'));

//     beforeEach(inject(function($rootScope) {
//         $scope = $rootScope;
//     }));

//     describe('controller', function() {

//         var ctrl, $element, $attrs;
//         beforeEach(inject(function($controller) {
//             $attrs = {};
//             $element = {};

//             ctrl = $controller('AccordionController', {
//                 $scope: $scope,
//                 $element: $element,
//                 $attrs: $attrs
//             });
//         }));

//         describe('addGroup', function() {
//             it('adds a the specified panel to the collection', function() {
//                 var group1, group2;
//                 ctrl.addGroup(group1 = $scope.$new());
//                 ctrl.addGroup(group2 = $scope.$new());
//                 expect(ctrl.groups.length).toBe(2);
//                 expect(ctrl.groups[0]).toBe(group1);
//                 expect(ctrl.groups[1]).toBe(group2);
//             });
//         });

//         describe('closeOthers', function() {
//             var group1, group2, group3;
//             beforeEach(function() {
//                 ctrl.addGroup(group1 = {
//                     isOpen: true,
//                     $on: angular.noop
//                 });
//                 ctrl.addGroup(group2 = {
//                     isOpen: true,
//                     $on: angular.noop
//                 });
//                 ctrl.addGroup(group3 = {
//                     isOpen: true,
//                     $on: angular.noop
//                 });
//             });
//             it('should close other panels if close-others attribute is not defined', function() {
//                 delete $attrs.closeOthers;
//                 ctrl.closeOthers(group2);
//                 expect(group1.isOpen).toBe(false);
//                 expect(group2.isOpen).toBe(true);
//                 expect(group3.isOpen).toBe(false);
//             });

//             it('should close other panels if close-others attribute is true', function() {
//                 $attrs.closeOthers = 'true';
//                 ctrl.closeOthers(group3);
//                 expect(group1.isOpen).toBe(false);
//                 expect(group2.isOpen).toBe(false);
//                 expect(group3.isOpen).toBe(true);
//             });

//             it('should not close other panels if close-others attribute is false', function() {
//                 $attrs.closeOthers = 'false';
//                 ctrl.closeOthers(group2);
//                 expect(group1.isOpen).toBe(true);
//                 expect(group2.isOpen).toBe(true);
//                 expect(group3.isOpen).toBe(true);
//             });

//             describe('setting accordionConfig', function() {
//                 var originalCloseOthers;
//                 beforeEach(inject(function(accordionConfig) {
//                     originalCloseOthers = accordionConfig.closeOthers;
//                     accordionConfig.closeOthers = false;
//                 }));
//                 afterEach(inject(function(accordionConfig) {
//                     // return it to the original value
//                     accordionConfig.closeOthers = originalCloseOthers;
//                 }));

//                 it('should not close other panels if accordionConfig.closeOthers is false', function() {
//                     ctrl.closeOthers(group2);
//                     expect(group1.isOpen).toBe(true);
//                     expect(group2.isOpen).toBe(true);
//                     expect(group3.isOpen).toBe(true);
//                 });
//             });
//         });

//         describe('removeGroup', function() {
//             it('should remove the specified panel', function() {
//                 var group1, group2, group3;
//                 ctrl.addGroup(group1 = $scope.$new());
//                 ctrl.addGroup(group2 = $scope.$new());
//                 ctrl.addGroup(group3 = $scope.$new());
//                 ctrl.removeGroup(group2);
//                 expect(ctrl.groups.length).toBe(2);
//                 expect(ctrl.groups[0]).toBe(group1);
//                 expect(ctrl.groups[1]).toBe(group3);
//             });
//             it('should ignore remove of non-existing panel', function() {
//                 var group1, group2;
//                 ctrl.addGroup(group1 = $scope.$new());
//                 ctrl.addGroup(group2 = $scope.$new());
//                 expect(ctrl.groups.length).toBe(2);
//                 ctrl.removeGroup({});
//                 expect(ctrl.groups.length).toBe(2);
//             });
//         });
//     });

// });
