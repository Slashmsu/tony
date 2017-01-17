/**
 * Created by SlashMSU on 29/11/2016.
 */

var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var secret = require('./config/secret');
var passport	= require('passport');
var jwt         = require('jwt-simple');
var bearerToken = require('express-bearer-token');
var myProjectConfiguration = require('./config/config');
var userRoutes = require('./routes/user-route');
var logisticRoutes = require('./routes/logistic-route');
var cityRoutes = require('./routes/city-route');
var packageRoutes = require('./routes/package-route');

var User = require('./models/user-model');

var app = express();

//ES 6 Promises
mongoose.Promise = global.Promise;
mongoose.connect(secret.database, function(err) {
    if (err)
        console.log(err);
    else
        console.log('Connected to database');
});

// log to console
app.use(morgan('dev'));

//Middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(myProjectConfiguration.config());
app.use(passport.initialize());
app.use(bearerToken());

app.use(userRoutes);
app.use(logisticRoutes);
app.use(cityRoutes);
app.use(packageRoutes);

app.listen(secret.port, function(err){
    if(err) throw err;
    console.log("Server started", "Post: ", secret.port);
});
