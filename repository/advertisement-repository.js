var Advertisement = require('../models/advertisement-model');

module.exports = {

    findWithParameters: function(limit, offset, callback) {
        Advertisement.find({}).skip(offset).limit(limit)
            .exec( function (err, results) {
                if (err)
                    console.log(err);
                else
                    callback(results);
            });
    },

    findById: function(advertisementId, callback) {
        Advertisement.findOne({ _id: advertisementId }, function(err, result) {
            if (err) return next(err);
            else callback(result);
        });
    },

    save: function(body, callback) {
        var advertisement = new Advertisement();
        advertisement.title = body.title;
        advertisement.description = body.description;
        advertisement.created_at = new Date();
        advertisement.updated_at = new Date();

        advertisement.save(function (err, result) {
            if (err)
                console.log(err);
            else
                callback(result);
        });
    },

    update: function(advertisementId, body, callback) {
        Advertisement.findOne({ _id: advertisementId }, function(err, result) {
            if (err) return next(err);
            result.title = body.title;
            result.description = body.description;
            result.updated_at = new Date();

            result.save(function (err, updatedResult) {
                if (err)
                    console.log(err);
                else
                    callback(updatedResult);
            });

        });
    }

};