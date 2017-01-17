const Graph = require('node-dijkstra');
var router = require('express').Router();
var City = require('../models/city-model');
var config = require('../config/secret');

//======================================================================================================================
// Get user list
//======================================================================================================================

router.get('/logistic', function(req, res) {
    City.find({})
          .exec( function (err, cities) {
            if (err)
                console.log(err);
            else {
                const route = new Graph();
                cities.forEach(function (city) {
                    var obj = {};
                    city.neighbors.forEach(function (neighbor) {
                        obj[neighbor.name] = neighbor.distance;

                    });
                    route.addNode(city.name, obj)
                });

                res.send(route.path(req.query.source, req.query.target, { cost: true }));
            }
    });
});

//======================================================================================================================
// Export
//======================================================================================================================

module.exports = router;