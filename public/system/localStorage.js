/**
 * Created by SlashMSU on 06/12/2016.
 */
/**
 * Created by Bakhtier Gaibulloev
 */
(function () {
    'use strict';
    angular.module('app')
        .service('LocalStorageRepository', LocalStorageRepository);

    function LocalStorageRepository(localStorageService, $http) {
        return {
            
            setToLocalStorage: function (key, value) {
                localStorageService.set(key, value);
            },

            getFromLocalStorage: function (key) {
                return localStorageService.get(key);
            },

            setToken: function (token) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + token;
            }

        };
    }
})();