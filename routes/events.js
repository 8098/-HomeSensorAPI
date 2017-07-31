const express = require('express');
const router = express.Router();
const Event = require('../models/events.js');

// get events from db
router.get('/events', function(req, res, next) {
    if (req.query.id == 'all') {
        Event.find({}).then(function(events) {
            res.send(events);
        }).catch(next);
    }
    else {
        Event.find({
            "_id": req.query.email
        }).then(function(event) {
            res.send(event);
        }).catch(next);
    }
});

// add a new event to db
router.post('/events', function(req, res, next) {
    Event.create(req.body).then(function(event) {
        res.send(event);
    }).catch(next);
});

// update an event in db
router.put('/events', function(req, res, next) {
    Event.findOneAndUpdate({
        _id: req.query.id
    }, req.body).then(function(event) {
        res.send(event);
    }).catch(next);
});

// delete an event from db
router.delete('/events', function(req, res, next) {
    Event.findOneAndRemove({
        _id: req.query.id
    }).then(function(event) {
        res.send(event);
    }).catch(next);
});

// delete all events for device from db
router.delete('/events/device', function(req, res, next) {
    Event.remove({
        deviceId: req.query.id
    }).then(function(event) {
        res.send(event);
    }).catch(next);
});

// delete all events for user from db
router.delete('/events/user', function(req, res, next) {
    Event.remove({
        userId: req.query.id
    }).then(function(event) {
        res.send(event);
    }).catch(next);
});

// export routes
module.exports = router;
