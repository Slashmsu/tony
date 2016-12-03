(function() {
    'use strict';
    angular.module('app').directive('tony', tony);

    angular.module('app').controller('TonyCtrl', TonyCtrl);


    function tony() {
        return {
            restrict: 'E',
            scope: true,
            controller: 'TonyCtrl',
            templateUrl: 'src/tony/view/tony.html'
        };
    }

    function TonyCtrl($scope) {

    }
})();