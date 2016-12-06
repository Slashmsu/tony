var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdvertisementSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
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
