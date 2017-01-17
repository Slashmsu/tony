var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoutSchema = new Schema({
    path: [String],
    cost: {
        type: Number,
        required: true
    }
});

var PackageSchema = new Schema({
    weight: {
        type: String,
        required: true
    },
    sourceCity: {
        type: mongoose.Schema.Types.ObjectId, ref: 'City',
        required: true
    },
    targetCity: {
        type: mongoose.Schema.Types.ObjectId, ref: 'City',
        required: true
    },
    routs: {
        type: RoutSchema,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Package', PackageSchema);
