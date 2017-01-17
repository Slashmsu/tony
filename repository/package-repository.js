var Package = require('../models/package-model');

module.exports = {

    find: function(packageId, callback) {
        Package.findById({ _id: packageId  })
            .populate('sourceCity')
            .populate('targetCity')
            .exec(function(err, result) {
            if (err)
                console.log(err);
            else
                callback(result);
        });
    },

    save: function(newPackage, callback) {

        var pack = new Package();
        pack.weight = newPackage.weight;
        pack.sourceCity = newPackage.sourceCity;
        pack.targetCity = newPackage.targetCity;
        pack.routs = newPackage.routs;
        pack.cost = newPackage.cost;

        pack.save(function (err, result) {
            if (err)
                console.log(err);
            else
                callback(result);
        });
    }

};