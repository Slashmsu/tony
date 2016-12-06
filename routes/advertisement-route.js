'use strict';

var router = require('express').Router();
var mime = require('mime');
var assert = require('assert');
var AdvertisementRepository = require('../repository/advertisement-repository');

//======================================================================================================================
// Get advertisement by id
//======================================================================================================================

router.get('/tony', function(req, res) {
    var mongooseFilter = require('../services/service-models/MongooseFilter');

    if ( req.query.offset !== undefined && preq.query.limit !== undefined) {
        mongooseFilter.offset = parseInt(req.query.offset);
        mongooseFilter.limit = parseInt(req.query.limit);
    }

    if (req.query.keywords)
        mongooseFilter.keywords = req.query.keywords;
    else
        delete mongooseFilter.keywords;

    AdvertisementRepository.findWithParameters(mongooseFilter, function (foundAdvertisements) {
        res.send(foundAdvertisements);
    });
});

router.get('/tony/:id', function(req, res) {
    var mongooseFilter = require('../services/service-models/MongooseFilter');
    mongooseFilter.id = req.params.id;

    AdvertisementRepository.findById(mongooseFilter , function (foundAdvertisement) {
        res.send(foundAdvertisement);
    });
});

//======================================================================================================================
// Add advertisement
//======================================================================================================================

router.post('/tony', function(req, res) {
    AdvertisementRepository.save(req.body , function (saveAdvertisement) {
        res.send(saveAdvertisement);
    });
});

router.put('/tony/:id', function(req, res){
    AdvertisementRepository.update(req.params.id, req.body , function (updaterAdvertisement) {
        res.send(updaterAdvertisement);
    });
});

//======================================================================================================================
// Remove advertisement
//======================================================================================================================

router.delete('/tony/:id', function(req, res) {
    AdvertisementRepository.remove(req.params.id , function () {
        res.status(200).send("Object with id " + req.params.id + " removed");
    });
});

//======================================================================================================================
// Export
//======================================================================================================================

module.exports = router;