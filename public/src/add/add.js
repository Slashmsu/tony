(function() {
    'use strict';
    angular.module('app').directive('add', add);

    angular.module('app').controller('AddCtrl', AddCtrl);


    function add() {
        return {
            restrict: 'E',
            scope: true,
            controller: 'AddCtrl',
            templateUrl: 'src/add/view/add.html'
        };
    }

    function AddCtrl($scope, $location) {

        $scope.advertisement = {title: "", text: ""};

        $scope.changeView = function() {
            $location.path("/");
        }

    }

})();