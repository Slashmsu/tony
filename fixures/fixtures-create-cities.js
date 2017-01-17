var secret = require('../config/secret');
var City = require('../models/city-model');
var Neighbor = require('../models/neighbor-model');
var mongoose = require('mongoose');



//ES 6 Promises
mongoose.Promise = global.Promise;
mongoose.connect(secret.database, function(err) {
    if (err)
        console.log(err);
    else
        console.log('Connected to database');
});

//========A=============================================================================================================
var city = new City();
city.name = "Köln";
city.neighbors = [
    { name: "Duran", distance: 80},
    { name: "Dortmund", distance: 65}
]

city.save(function(err) {
    if (err) {
        console.log(err);
    }
    console.log('Successful created new city.');
});
//========B=============================================================================================================

city = new City();
city.name = "Duran";
city.neighbors = [
    { name: "Köln", distance: 80},
    { name: "Hannover", distance: 140},
    { name: "Dortmund", distance: 115}
]

city.save(function(err) {
    if (err) {
        console.log(err);
    }
    console.log('Successful created new city.');
});

//========C=============================================================================================================

city = new City();
city.name = "Hannover";
city.neighbors = [
    { name: "Duran", distance: 140},
    { name: "Dortmund", distance: 125}
]

city.save(function(err) {
    if (err) {
        console.log(err);
    }
    console.log('Successful created new city.');
});

//========C=============================================================================================================

city = new City();
city.name = "Dortmund";
city.neighbors = [
    { name: "Hannover", distance: 125},
    { name: "Duran", distance: 115},
    { name: "Köln", distance: 65}
]

city.save(function(err) {
    if (err) {
        console.log(err);
    }
    console.log('Successful created new city.');
});