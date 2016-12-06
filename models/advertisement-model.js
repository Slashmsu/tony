var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdvertisementSchema = new Schema({
    title: String,
    description: String,
    // author:
    // attachedPhoto:
    // likes:
    // dislikes:
    created_at: Date,
    updated_at: Date
});

// AdvertisementSchema.plugin(mongoosastic, {
//   hosts: [
//     'localhost:27017'
//   ]
// });

module.exports = mongoose.model('Advertisement', AdvertisementSchema);
