/**
 * Created by Bakhtier Gaibulloev
 */
(function () {
    'use strict';
    angular.module('app')
        .service('LogisticRepository', LogisticRepository);

    function LogisticRepository(requesterNg) {
        return {

            getLogisticRoute: function (sourceCity, targetCity) {
                return requesterNg.get("/logistic" + "?source=" + sourceCity + "&" + "target=" + targetCity);
            }

        };
    }
})();