var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var NeighborSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    }
});

var CitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    neighbors: [NeighborSchema]

});

module.exports = mongoose.model('City', CitySchema);
