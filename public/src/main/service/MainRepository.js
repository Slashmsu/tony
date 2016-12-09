/**
 * Created by Bakhtier Gaibulloev
 */
(function () {
    'use strict';
    angular.module('app')
        .service('MainRepository', MainRepository);

    function MainRepository($http, LocalStorageRepository) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + LocalStorageRepository.getFromLocalStorage("token");
        return {
            getList: function (filter) {
                return $http({
                    method: 'GET',
                    url: 'http://localhost:7000/tony',
                    header: {
                        "Content-Type" : 'application/json',
                        "Authorization": LocalStorageRepository.getFromLocalStorage("token")
                    },
                    params: filter
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
            , save: function (tony) {
                return $http({
                    method: 'POST'
                    , url: 'http://localhost:7000/tony'
                    , data: tony
                }).then(function successCallback(response) {
                        return response.data;
                    }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
            }
            , update: function (tony) {
                return $http({
                    method: 'PUT'
                    , url: 'http://localhost:7000/tony/' + tony._id
                    , data: tony
                }).then(function successCallback(response) {
                    return response.data;
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            }
            , remove: function (tony) {
                return $http({
                    method: 'DELETE'
                    , url: 'http://localhost:7000/tony/' + tony._id
                    , data: tony
                }).then(function successCallback(response) {
                    return response.data;
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            }
        };
    }
})();