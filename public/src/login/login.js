(function() {
    'use strict';
    angular.module('app').directive('login', login);

    angular.module('app').controller('LoginCtrl', LoginCtrl);


    function login() {
        return {
            restrict: 'E',
            scope: true,
            controller: 'LoginCtrl',
            templateUrl: 'src/login/view/login.html'
        };
    }

    function LoginCtrl($scope, $location, UserRepository, LocalStorageRepository) {

        $scope.user = {email: null, password: null};

        $scope.login = function (user) {
            UserRepository.authenticate(user).then(function successCallback(logenedUser) {
                LocalStorageRepository.setToLocalStorage("user", logenedUser.user);
                LocalStorageRepository.setToLocalStorage("token", logenedUser.token);
                LocalStorageRepository.setToken(logenedUser.token);

                $location.path("/");
            });
        };

        $scope.changeView = function(view) {
            $location.path(view);
        };

    }

})();