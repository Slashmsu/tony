(function() {
    'use strict';
    angular.module('app').directive('logout', logout);

    angular.module('app').controller('LogoutCtrl', LogoutCtrl);


    function logout() {
        return {
            restrict: 'E',
            controller: 'LogoutCtrl',
            templateUrl: 'src/user/logout/view/logout.html'
        };
    }

    function LogoutCtrl($scope, $location, UserRepository, UserService, requesterNg) {

            $scope.currentUser = UserService.getCurrentUser();
            UserRepository.logout($scope.currentUser).then(function successCallback() {
                UserService.clearAll();
                requesterNg.clearToken();
                $location.path("/");
            });

    }

})();