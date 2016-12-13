(function() {
    'use strict';
    angular.module('app').directive('signUp', signUp);

    angular.module('app').controller('SignUpCtrl', SignUpCtrl);


    function signUp() {
        return {
            restrict: 'E',
            scope: true,
            controller: 'SignUpCtrl',
            templateUrl: 'src/user/signUp/view/signUp.html'
        };
    }

    function SignUpCtrl($scope, $location, UserRepository, LocalStorageRepository, requesterNg) {

        $scope.user = {email: null, password: null};

        $scope.signUp = function (user) {
            UserRepository.signup(user).then(function successCallback(logenedUser) {
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