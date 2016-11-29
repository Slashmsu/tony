'use strict';

Error.stackTraceLimit = Infinity;
var Advertisement = require('../models/advertisement-model');
var router = require('express').Router();
var mime = require('mime');
var assert = require('assert');
var AdvertisementRepository = require('../repository/advertisement-repository');

//======================================================================================================================
// Get advertisement by id
//======================================================================================================================

router.get('/advertisement', function(req, res, next) {
    // var MongooseFilter = require('../services/service-models/MongooseFilter');

});

router.get('/advertisement/:id', function(req, res, next) {
    // var MongooseFilter = require('../services/service-models/MongooseFilter');

});

//======================================================================================================================
// Add advertisement
//======================================================================================================================

router.post('/add-advertisement', function(req, res, next) {
    var advertisement = new Advertisement();
    advertisement.title = req.body.title;
    advertisement.text = req.body.text;
    advertisement.created_at = new Date();
    advertisement.updated_at = new Date();

    var promise = advertisement.save();
    assert.ok(promise instanceof require('mpromise'));

    promise.then(function (savedAdvertisement) {
        res.send(savedAdvertisement);
    });

});

router.post('/edit-advertisement/:id', function(req, res, next){

});

//======================================================================================================================
// Remove advertisement
//======================================================================================================================

router.get('/remove-advertisement/:id', function(req, res) {


});

//======================================================================================================================
// Export
//======================================================================================================================

module.exports = router;