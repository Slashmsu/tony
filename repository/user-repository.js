var User = require('../models/user-model');

module.exports = {

    findWithParameters: function(mongooseFilter, callback) {

        if (mongooseFilter.keywords)
            var qb = User.find({ email: { $regex: ".*" + mongooseFilter.keywords + ".*" }});
        else
            var qb = User.find({});

        qb.skip(mongooseFilter.offset)
            .limit(mongooseFilter.limit)
            .sort('-created_at')
            .select("-password")
            .exec( function (err, results) {
                if (err)
                    console.log(err);
                else
                    callback(results);
            });
    },

    findById: function(MongooseFilter, callback) {
        User.findOne({ _id: MongooseFilter.id })
            .select("-password")
            .exec(function(err, result) {
            if (err)
                console.log(err);
            else
                callback(result);
        });
    },

    save: function(body, callback) {
        var user = new User();
        user.name = body.name;
        user.secondName = body.secondName;
        user.email = body.email;
        user.password = body.password;
        user.created_at = new Date();
        user.updated_at = new Date();

        user.save(function (err, result) {
            if (err)
                console.log(err);
            else
                callback(result);
        });
    },

    update: function(userId, body, callback) {
        User.findOne({ _id: userId }, function(err, result) {
            if (err) console.log(err);
            result.name = body.name;
            result.secondName = body.secondName;
            result.email = body.email;
            result.password = body.password;
            result.updated_at = new Date();

            result.save(function (err, updatedResult) {
                if (err)
                    console.log(err);
                else
                    callback(updatedResult);
            });

        });
    },

    remove: function(userId, callback) {
        User.findOneAndRemove({ _id: userId }, function(err) {
            if (err)
                console.log(err);
            else
                callback();
        });
    }

};