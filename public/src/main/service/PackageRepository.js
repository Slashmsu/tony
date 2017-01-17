/**
 * Created by Bakhtier Gaibulloev
 */
(function () {
    'use strict';
    angular.module('app')
        .service('PackageRepository', PackageRepository);

    function PackageRepository(requesterNg) {
        return {
            
            save: function (newPackage) {
                return requesterNg.post("/packages", {package: newPackage});
            },

            find: function (packageId) {
                console.log(packageId);
                return requesterNg.get("/packages?id=" + packageId);
            }
            
        };
    }
})();