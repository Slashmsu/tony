/**
 * Created by Bakhtier Gaibulloev
 */
(function () {
    'use strict';
    angular.module('app')
        .service('MainRepository', MainRepository);

    function MainRepository(requesterNg) {
        return {
            getList: function (filter) {
                return requesterNg.get("/tony", filter);

            },

            getById: function (id) {
                return requesterNg.getById("/tony/" + id);
            },

            save: function (tony) {
                return requesterNg.get("/tony", tony);
            },

            update: function (tony) {
                return requesterNg.put("/tony/" + tony._id, tony);
            },

            remove: function (tony) {
                return requesterNg.delete("/tony/" + tony.id);
            }
        };
    }
})();