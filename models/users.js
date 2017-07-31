const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create user schema
const UserSchema = new Schema({
    timestamp: {
        type: Date,
        required: [true, 'field is required'],
        default: Date.now
    },
    email: {
        type: String,
        required: [true, 'field is required'],
        unique: true
    },
    location: {
        type: String,
        required: [true, 'field is required']
    },
    password: {
        type: String,
        required: [true, 'field is required']
    },
    devices: [{
        timestamp: {
            type: Date,
            default: Date.now
        },
        name: {
            type: String,
            required: [true, 'field is required'],
            unique: true
        },
        sortOrder: {
            type: Number,
            required: [true, 'field is required'],
            unique: true
        }
    }]
});

module.exports = mongoose.model('users', UserSchema);
