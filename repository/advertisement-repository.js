var Advertisement = require('../models/advertisement-model');

module.exports = {

    findAll: function(MongooseFilter, callback) {
        Advertisement.find({}, function(err, results) {
            if (err) return next(err);
        });
    },

    findById: function(MongooseFilter, callback) {
        Advertisement.find({ _id: MongooseFilter._id }, function(err, results) {
            if (err) return next(err);
            else callback(results);
        });
    },

    findByShartnoma: function(MongooseFilter, callback) {
        Advertisement.find({ _id: MongooseFilter._id }, function(err, results) {
            if (err) return next(err);
            else callback(results);
        });
    },

    findByName: function(MongooseFilter, next, callback) {
        Advertisement.findOne({ name: MongooseFilter.name }, function(err, results) {
            if (err) return next(err);
            callback(results);
        });
    }

};