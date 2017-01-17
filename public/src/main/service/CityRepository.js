/**
 * Created by Bakhtier Gaibulloev
 */
(function () {
    'use strict';
    angular.module('app')
        .service('CityRepository', CityRepository);

    function CityRepository(requesterNg) {
        return {
            getList: function (filter) {
                return requesterNg.get("/city", filter);

            },

            getById: function (id) {
                return requesterNg.getById("/city/" + id);
            },

            getAll: function (citiesName) {
                return requesterNg.get("/city" + "?keywords=" + citiesName);
            },

            save: function (tony) {
                return requesterNg.post("/city", tony);
            },

            update: function (tony) {
                return requesterNg.put("/city/" + tony._id, tony);
            },

            remove: function (tony) {
                return requesterNg.delete("/city/" + tony.id);
            }
        };
    }
})();