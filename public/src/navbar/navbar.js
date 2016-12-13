(function() {
    'use strict';
    angular.module('app').directive('navbar', navbar);

    angular.module('app').controller('NavbarCtrl', NavbarCtrl);


    function navbar() {
        return {
            restrict: 'E',
            scope: true,
            controller: 'NavbarCtrl',
            templateUrl: 'src/navbar/view/navbar.html'
        };
    }

    function NavbarCtrl($scope, $location, UserService) {

        $scope.currentUser = UserService.getCurrentUser();
        $scope.isCollapsed = true;

    }

})();