/**
 * Created by Bakhtier Gaibulloev
 */
(function () {
    'use strict';
    angular.module('app')
        .service('TonyRepository', TonyRepository);

    function TonyRepository($http) {
        return {
            getList: function () {
                return $http({
                    method: 'GET'
                    , url: 'http://localhost:7000/tony'
                }).then(function successCallback(response) {
                        return response.data;
                    }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
            }
            , getById: function (id) {
                return $http({
                    method: 'GET'
                    , url: 'http://localhost:7000/tony/' + id
                }).then(function successCallback(response) {
                        return response.data;
                    }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
            }
            , getListWithParametr: function (name) {
                console.log(name);
                return $http({
                    method: 'GET'
                    , url: 'http://localhost:7000/tony/'
                    , params: {
                        name: name
                    }
                }).then(function successCallback(response) {
                        return response.data;
                    }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
            }
            , saveTony: function (tony) {
                return $http({
                    method: 'POST'
                    , url: 'http://localhost:7000/tony'
                    , data: tony
                }).then(function successCallback(response) {
                        console.log(response.data);
                        return response.data;
                    }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
            }
            , update: function (tony) {
                $http({
                    method: 'PUT'
                    , url: 'http://localhost:7000/tony/' + tony.id
                    , data: tony
                });
            }
            , remove: function (tony) {
                return $http.delete('http://localhost:7000/tony/' + tony.id);
            }
        };
    }
})();