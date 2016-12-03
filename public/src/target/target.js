(function() {
    'use strict';
    angular.module('app').directive('target', target);

    angular.module('app').controller('TargetCtrl', TargetCtrl);


    function target() {
        return {
            restrict: 'E',
            scope: true,
            controller: 'TargetCtrl',
            templateUrl: 'src/target/view/target.html'
        };
    }

    function TargetCtrl($scope) {

    }
})();