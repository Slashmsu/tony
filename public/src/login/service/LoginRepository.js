/**
 * Created by Bakhtier Gaibulloev
 */

(function () {
    'use strict';
    angular.module('app')
        .service('UserRepository', UserRepository);

    function UserRepository($http) {
        return {
            getList: function (filter) {
                return $http({
                    method: 'GET'
                    ,url: 'http://localhost:7000/user',
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
                    , url: 'http://localhost:7000/user/' + id
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
                    , url: 'http://localhost:7000/user/'
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
            , authenticate: function (user) {
                return $http({
                    method: 'POST'
                    , url: 'http://localhost:7000/authenticate'
                    , data: user
                }).then(function successCallback(response) {
                    return response.data;
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            }
            , signup: function (user) {
                return $http({
                    method: 'POST'
                    , url: 'http://localhost:7000/signup'
                    , data: user
                }).then(function successCallback(response) {
                    return response.data;
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            }
            , update: function (user) {
                return $http({
                    method: 'PUT'
                    , url: 'http://localhost:7000/user/' + user._id
                    , data: user
                }).then(function successCallback(response) {
                    return response.data;
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            }
            , remove: function (user) {
                return $http({
                    method: 'DELETE'
                    , url: 'http://localhost:7000/user/' + user._id
                    , data: user
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