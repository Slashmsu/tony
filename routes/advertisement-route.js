'use strict';

var router = require('express').Router();
var mime = require('mime');
var assert = require('assert');
var AdvertisementRepository = require('../repository/advertisement-repository');


//======================================================================================================================
// Get advertisement by id
//======================================================================================================================

router.get('/tony', function(req, res) {
    var limit = parseInt(req.query.limit);
    var offset = parseInt(req.query.offset);

    AdvertisementRepository.findWithParameters(limit, offset, function (foundAdvertisements) {
        res.send(foundAdvertisements);
    });
});

router.get('/tony/:id', function(req, res) {
    AdvertisementRepository.findById(req.params.id , function (foundAdvertisement) {
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
    res.send(123);

});

//======================================================================================================================
// Export
//======================================================================================================================

module.exports = router;