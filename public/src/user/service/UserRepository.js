/**
 * Created by Bakhtier Gaibulloev
 */

(function () {
    'use strict';
    angular.module('app')
        .service('UserRepository', UserRepository);

    function UserRepository(requesterNg) {
        return {
            getList: function (filter) {
                return requesterNg.get("/user/", filter);
            },

            getById: function (id) {
                return requesterNg.getById("/user/", id);
            },

            authenticate: function (user) {
                return requesterNg.post("/authenticate/", user);
            },

            signup: function (user) {
                return requesterNg.post("/signup/", user);
            },

            logout: function () {
                return requesterNg.get("/log-out", {})
            },

            update: function (user) {
                return requesterNg.put("/user/" + user._id, user);
            }
        };
    }
})();