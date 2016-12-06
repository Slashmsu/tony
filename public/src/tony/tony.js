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

    function TonyCtrl($scope, $location, TonyRepository, LocalStorageRepository) {

        $scope.tonies = [];
        $scope.filter = {keywords: null};
        $scope.currentUser = LocalStorageRepository.getCurrentUser();

        $scope.changeView = function(view) {
            $location.path(view);
        };

        $scope.logOut = function() {
            $location.path("login");
            $scope.currentUser = null;
            LocalStorageRepository.clearAll();
        };

        $scope.goToUpdate = function (tonyId) {
            $location.path("update/" + tonyId);
        };

        $scope.loadTonies = function (filter) {
            TonyRepository.getList(filter).then(function successCallback(tonies) {
                $scope.tonies = tonies;
            });
        };

        $scope.remove = function (tony) {
            TonyRepository.remove(tony).then(function successCallback() {
                $scope.tonies.splice($scope.tonies.indexOf(tony), 1);
            });
        };

        // ================================ Init =======================================================================

        $scope.loadTonies();

    }

})();