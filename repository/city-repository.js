var City = require('../models/city-model');

module.exports = {

    findCities: function(keywords, callback) {

        if (keywords)
            var qb = City.find({ name: { $regex: new RegExp(keywords, "i")  }});
        else
            var qb = City.find({});

        qb.select("-neighbors")
          .exec( function (err, results) {
              if (err)
                  console.log(err);
              else
                  callback(results);
          });
    }

};