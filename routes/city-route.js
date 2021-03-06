var router = require('express').Router();
var CityRepository = require('../repository/city-repository');


//======================================================================================================================
// Get cities list
//======================================================================================================================

router.get('/city', function(req, res) {
    CityRepository.findCities(req.query.keywords, function (foundCities) {
        res.send(foundCities);
    });
});

//======================================================================================================================
// Export
//======================================================================================================================

module.exports = router;