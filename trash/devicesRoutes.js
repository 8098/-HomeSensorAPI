const express = require('express');
const router = express.Router();
const Device = require('../models/devices.js');
const User = require('../models/users.js');

// add a new device to db
router.post('/devices', function(req, res, next) {
    var deviceId = '';
    
    Device.create(req.body).then(function(device) {
        // console.log(device._id);
        deviceId = device._id;
        console.log(deviceId);
    }).catch(next);

    User.findOneAndUpdate({
        _id: req.body.userId
    }, {
        $set: {
            password: "test",
            devices: ["597ce1929010243de04722ab"]
        }
    }, {
        new: true
    }).then(function(user) {
        res.send(user);
    }).catch(next);
});

// update a device in db
router.put('/devices/:id', function(req, res, next) {
    Device.findOneAndUpdate({
        _id: req.params.id
    }, req.body).then(function(device) {
        res.send(device);
    }).catch(next);
});

// delete a device from db
router.delete('/devices/:id', function(req, res, next) {
    Device.findOneAndRemove({
        _id: req.params.id
    }).then(function(device) {
        res.send(device);
    }).catch(next);
});

// export routes
module.exports = router;
