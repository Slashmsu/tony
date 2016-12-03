(function() {
    'use strict';
    angular.module('app').directive('advertisement', advertisement);

    angular.module('app').controller('AdvertisementCtrl', AdvertisementCtrl);


    function advertisement() {
        return {
            restrict: 'E',
            scope: true,
            controller: 'AdvertisementCtrl',
            templateUrl: 'src/advertisement/view/advertisement.html'
        };
    }

    function AdvertisementCtrl($scope) {

    }
})();