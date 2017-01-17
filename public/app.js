/**
 * Created by SlashMSU on 29/11/2016.
 */
(function () {
    'use strict';

    var main = angular.module('app', [
        'ngRoute', 'ui.bootstrap', 'LocalStorageModule', 'RequesterModule', 'ngMaterial'
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
            .when('/package-page/:id', {
                template: '<package-page></package-page>'
            })
            .when('/login/', {
                template: '<login></login>'
            })
            .when('/sign-up/', {
                template: '<sign-up></sign-up>'
            })
            .when('/log-out/', {
                template: '<logout></logout>'
            })

        ;
        $routeProvider.otherwise({ redirectTo: '/' });
    }]);

    main.run(function(requesterNg) {
        requesterNg.setUrl("http://localhost:7000");
    });

})();