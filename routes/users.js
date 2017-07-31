const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

// get users from db
router.get('/users', function(req, res, next) {
    if (req.query.email == 'all') {
        User.find({}).then(function(user) {
            res.send(user);
        }).catch(next);
    }
    else {
        User.find({
            "email": req.query.email
        }).then(function(user) {
            res.send(user);
        }).catch(next);
    }
});

// add a new user to db
router.post('/users', function(req, res, next) {
    User.create(req.body).then(function(user) {
        res.send(user);
    }).catch(next);
});

// update a user in db
router.put('/users', function(req, res, next) {
    User.findOneAndUpdate({
        _id: req.query.id
    }, req.body, {
        new: true
    }).then(function(user) {
        res.send(user);
    }).catch(next);
});

// delete a user from db
router.delete('/users', function(req, res, next) {
    User.findOneAndRemove({
        _id: req.query.id
    }).then(function(user) {
        res.send(user);
    }).catch(next);
});

// create a device in db
router.post('/users/devices', function(req, res, next) {
    User.findOneAndUpdate({
            _id: req.query.userId,
        }, {
            $push: {
                "devices": {
                    "name": req.body.devices.name,
                    "sortOrder": req.body.devices.sortOrder
                }
            }
        }, {
            new: true
        })
        .then(function(user) {
            res.send(user);
        }).catch(next);
});

// update a device in db
router.put('/users/devices', function(req, res, next) {
    User.findOneAndUpdate({
            _id: req.query.userId,
            "devices._id": req.query.deviceId
        }, {
            $set: {
                "devices.$.name": req.body.name,
                "devices.$.sortOrder": req.body.sortOrder
            }
        }, {
            new: true
        })
        .then(function(user) {
            res.send(user);
        }).catch(next);
});

// delete a device from db
router.delete('/users/devices', function(req, res, next) {
    User.findOneAndUpdate({
            _id: req.query.userId
        }, {
            $pull: {
                "devices": {
                    "_id": req.query.deviceId
                }
            }
        }, {
            new: true
        })
        .then(function(user) {
            res.send(user);
        }).catch(next);
});

// export routes
module.exports = router;
