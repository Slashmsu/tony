(function() {
    'use strict';
    angular.module('app').directive('logout', logout);

    angular.module('app').controller('LogoutCtrl', LogoutCtrl);


    function logout() {
        return {
            restrict: 'E',
            scope: true,
            controller: 'LogoutCtrl',
            templateUrl: 'src/logout/view/logout.html'
        };
    }

    function LogoutCtrl($scope, $location, UserRepository, LocalStorageRepository) {

        $scope.logout = function (user) {
            UserRepository.logout(user).then(function successCallback() {
                LocalStorageRepository.clearAll();

                $location.path("/");
            });
        };

    }

})();