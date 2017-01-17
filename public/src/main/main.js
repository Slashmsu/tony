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

    function MainCtrl($scope, CityRepository, LogisticRepository, PackageRepository, $location) {

        $scope.cities = [];
        $scope.newPackage = {
            weight: "10",
            sourceCity: null,
            targetCity: null,
            routs: null,
            cost: 0
        };

        $scope.getCitiesList = function (citiesName) {
            return CityRepository.getAll(citiesName).then(function (cities) {
               return cities
            })
        };

        $scope.calculate = function (newPackage) {
            return LogisticRepository.getLogisticRoute(newPackage.sourceCity.name, newPackage.targetCity.name).then(function (route) {
                $scope.newPackage.routs = route;
            })
        };

        $scope.savePackage = function (newPackage) {

            if (newPackage.weight === "10")
                newPackage.cost = newPackage.routs.cost * 0.20;
            else if (newPackage.weight === "50")
                newPackage.cost = newPackage.routs.cost * 0.40;
            else if (newPackage.weight === "100")
                newPackage.cost = newPackage.routs.cost * 0.80;

            return PackageRepository.save(newPackage).then(function (savedPackage) {
                $location.path( "/package-page/" + savedPackage._id);
            })
        };

//======================================================================================================================
// Initialization
//======================================================================================================================


    }

})();