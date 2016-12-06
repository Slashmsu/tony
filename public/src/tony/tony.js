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

    function TonyCtrl($scope, $location, TonyRepository) {

        $scope.tonies = [];
        $scope.filter = {keywords: null};

        $scope.changeView = function() {
            $location.path("add");
        };

        $scope.goToUpdate = function (tonyId) {
            $location.path("update/" + tonyId);
        };

        $scope.loadTonies = function (filter) {
            TonyRepository.getList(filter).then(function successCallback(tonies) {
                $scope.tonies = tonies;
            });
        };

        // Init
        $scope.loadTonies();

    }

})();