(function() {
    'use strict';
    angular.module('app').directive('login', login);

    angular.module('app').controller('LoginCtrl', LoginCtrl);


    function login() {
        return {
            restrict: 'E',
            scope: true,
            controller: 'LoginCtrl',
            templateUrl: 'src/user/login/view/login.html'
        };
    }

    function LoginCtrl($scope, $location, UserRepository, LocalStorageRepository, requesterNg) {

        $scope.user = {email: null, password: null};

        $scope.login = function (user) {
            UserRepository.authenticate(user).then(function successCallback(logenedUser) {
                LocalStorageRepository.setToLocalStorage("currentUser", logenedUser.user);
                LocalStorageRepository.setToLocalStorage("token", logenedUser.token);
                requesterNg.setToken(logenedUser.token);
                $location.path("/");
            });
        };

        $scope.changeView = function(view) {
            $location.path(view);
        };

    }

})();