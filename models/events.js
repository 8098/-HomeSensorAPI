const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create sensor readings schema
const SensorReadingsSchema = new Schema({
    temperature: Number,
    humidity: Number,
    light: Number,
    motion: Boolean,
    wifiSignal: Number,
    wifiBars: Number
});

// create outside weather schema
const OutsideWeatherSchema = new Schema({
    descritpion: String,
    temperature: Number,
    humidity: Number,
    windSpeed: Number,
    windDeg: Number
});

// create event schema
const EventSchema = new Schema({
    timestamp: {
        type: Date,
        required: [true, 'field is required'],
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'field is required'],
    },
    deviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'devices',
        required: [true, 'field is required'],
    },
    sensorReadings: SensorReadingsSchema,
    outsideWeather: OutsideWeatherSchema
});

// const eventSchema = new Schema({
//     name: {
//         type: String,
//         required: [true, 'field is required']
//     },
//     rank: {
//         type: String
//     },
//     available: {
//         type: Boolean(),
//         default: false
//     }
// });

module.exports = mongoose.model('events', EventSchema);
