var mongoose = require('mongoose');
// var mongoosastic = require('mongoosastic');
var Schema = mongoose.Schema;

var AdvertisementSchema = new Schema({
    title: String,
    text: String,
    // author:
    // attachedPhoto:
    created_at: Date,
    updated_at: Date
});


// AdvertisementSchema.plugin(mongoosastic, {
//   hosts: [
//     'localhost:27017'
//   ]
// });

module.exports = mongoose.model('Advertisement', AdvertisementSchema);
