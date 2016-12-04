/**
 * Created by SlashMSU on 29/11/2016.
 */
(function () {
    'use strict';

    var main = angular.module('app', [
        'ngRoute', 'ui.bootstrap'
//=================    My modules     ==================================================================================
    ]);
//==================================== Routing =========================================================================

    main.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                template: '<tony></tony>'
            })
            .when('/add', {
                template: '<add></add>'
            })

        ;
        $routeProvider.otherwise({ redirectTo: '/' });
    }]);


    main.controller('AppCtrl', function ($scope) {

    });

})();