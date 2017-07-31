const express = require('express');
const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongodbUri = 'mongodb://jcthedude:LukeSkywalker!@ds149412.mlab.com:49412/home_sensors';

// setup express app
const app = express();
app.set('port', (process.env.PORT || 3000));

// connect to mongodb
mongoose.connect(mongodbUri);
mongoose.Promise = global.Promise;

// initialize middleware
app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', eventRoutes);
app.use(function(err, req, res, next) {
    res.status(422).send({
        error: err.message
    });
    res.status(404).send({
        url: req.originalUrl + ' not found'
    });
});


// listen for requests
app.listen(app.get('port'), function() {
    console.log('Now listening on port ', app.get('port'));
});
