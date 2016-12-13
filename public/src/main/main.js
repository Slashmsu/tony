(function() {
    'use strict';
    angular.module('app').directive('main', main);

    angular.module('app').controller('MainCtrl', MainCtrl);


    function main() {
        return {
            restrict: 'E',
            scope: true,
            controller: 'MainCtrl',
            templateUrl: 'src/main/view/main.html'
        };
    }

    function MainCtrl($scope, $location) {

        // $scope.tonies = [];
        // $scope.filter = {keywords: null};
        // $scope.currentUser = LocalStorageRepository.getCurrentUser();
        //
        // $scope.changeView = function(view) {
        //     $location.path(view);
        // };
        //
        // $scope.logOut = function() {
        //     $location.path("login");
        //     $scope.currentUser = null;
        //     LocalStorageRepository.clearAll();
        //     requesterNg.clearToken();
        // };
        //
        // $scope.goToUpdate = function (mainId) {
        //     $location.path("update/" + mainId);
        // };
        //
        // $scope.loadTonies = function (filter) {
        //     MainRepository.getList(filter).then(function successCallback(tonies) {
        //         $scope.tonies = tonies;
        //     });
        // };
        //
        // $scope.remove = function (main) {
        //     MainRepository.remove(main).then(function successCallback() {
        //         $scope.tonies.splice($scope.tonies.indexOf(main), 1);
        //     });
        // };

        // ================================ Init =======================================================================

        // $scope.loadTonies();

    }

})();