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

    function AddCtrl($scope, $location, MainRepository, $routeParams) {
        if ($routeParams.id) {
            MainRepository.getById($routeParams.id).then(function successCallback(foundTony) {
                if ($routeParams.id && foundTony) {
                    $scope.tony = foundTony;
                } else {
                    $scope.tony = {title: "", description: ""};
                }
            });
        } else {
            $scope.tony = {title: "", description: ""};
        }

        $scope.changeView = function() {
            $location.path("/");
        };

        $scope.save = function (tony) {
            console.log(tony);
            if (tony.title && tony.description) {
                if (tony._id)
                    MainRepository.update(tony).then(function successCallback() {
                        console.log();
                        $location.path("/");
                    });
                else
                    MainRepository.save(tony).then(function successCallback() {
                    $location.path("/");
                });
            }
        };

    }

})();