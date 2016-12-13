/**
 * Created by SlashMSU on 13/12/2016.
 */
/**
 * Created by Bakhtier Gaibulloev
 */

(function () {
    'use strict';
    angular.module('app')
        .service('UserService', UserService);

    function UserService(localStorageService) {
        return {
            setToLocalStorage: function (key, value) {
                localStorageService.set(key, value);
            },

            getFromLocalStorage: function (key) {
                return localStorageService.get(key);
            },

            getCurrentUser: function () {
                return localStorageService.get("currentUser");
            },

            clearAll: function() {
                return localStorageService.clearAll();
            }
        };
    }
})();