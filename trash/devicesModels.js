const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create devcie schema
const DeviceSchema = new Schema({
    timestamp: {
        type: Date,
        required: [true, 'field is required'],
        default: Date.now
    },
    name: {
        type: String,
        required: [true, 'field is required']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'field is required'],
    },
    sortOrder: {
        type: Number
    }
});

module.exports = mongoose.model('devices', DeviceSchema);
