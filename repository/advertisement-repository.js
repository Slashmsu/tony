var Advertisement = require('../models/advertisement-model');

module.exports = {

    findWithParameters: function(mongooseFilter, callback) {

        if (mongooseFilter.keywords)
            var qb = Advertisement.find({ title: { $regex: ".*" + mongooseFilter.keywords + ".*" }});
        else
            var qb = Advertisement.find({});

        qb.skip(mongooseFilter.offset)
            .limit(mongooseFilter.limit)
            .sort('-created_at')
            .exec( function (err, results) {
                if (err)
                    console.log(err);
                else
                    callback(results);
            });
    },

    findById: function(MongooseFilter, callback) {
        Advertisement.findOne({ _id: MongooseFilter.id }, function(err, result) {
            if (err)
                console.log(err);
            else
                callback(result);
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
            if (err) console.log(err);
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
    },

    remove: function(advertisementId, callback) {
        Advertisement.findOneAndRemove({ _id: advertisementId }, function(err) {
            if (err)
                console.log(err);
            else
                callback();
        });
    }

};