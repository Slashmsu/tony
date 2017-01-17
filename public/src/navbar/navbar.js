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

    function NavbarCtrl($scope, $location, UserService, PackageRepository) {

        $scope.currentUser = UserService.getCurrentUser();
        $scope.isCollapsed = true;
        $scope.packages = [];

        $scope.getPackages = function (packageId) {
            console.log(packageId);
            if (packageId.length >= 24)
                return PackageRepository.find(packageId).then(function (foundPackage) {
                    $location.path("/package-page/" + foundPackage._id);
                    return foundPackage
                })
        };

    }

})();