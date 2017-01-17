(function() {
    'use strict';
    angular.module('app').directive('packagePage', packagePage);

    angular.module('app').controller('PackagePageCtrl', PackagePageCtrl);


    function packagePage() {
        return {
            restrict: 'E',
            scope: true,
            controller: 'PackagePageCtrl',
            templateUrl: 'src/package-page/view/package-page.html'
        };
    }

    function PackagePageCtrl($scope, PackageRepository, $routeParams) {

        $scope.package = null;

        PackageRepository.find($routeParams.id).then(function (foundPackage) {
            console.log(foundPackage);
            $scope.package = foundPackage;
        });

    }

})();