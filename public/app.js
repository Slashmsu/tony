/**
 * Created by SlashMSU on 29/11/2016.
 */
(function () {
    'use strict';

    var main = angular.module('app', [
        'ngRoute', 'ui.bootstrap', 'LocalStorageModule'
//=================    My modules     ==================================================================================
    ]);
//==================================== Routing =========================================================================

    main.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                template: '<main></main>'
            })
            .when('/add', {
                template: '<add></add>'
            })
            .when('/update/:id', {
                template: '<add></add>'
            }).when('/login/', {
                template: '<login></login>'
            })

        ;
        $routeProvider.otherwise({ redirectTo: '/' });
    }]);


    main.controller('AppCtrl', function ($scope) {

    });

})();