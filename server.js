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

var Advertisement = require('./models/advertisement-model');
var User = require('./models/user-model');

var app = express();

mongoose.connect(secret.database, function(err) {
    if (err)
        console.log(err);
    else
        console.log('Connected to database');
});

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
    res.header('Access-Control-Max-Age', '1000');
    next();
};

// log to console
app.use(morgan('dev'));

//Middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(allowCrossDomain);
app.use(passport.initialize());
app.use(bearerToken());

var advertisementRoutes = require('./routes/advertisement-route');
var userRoutes = require('./routes/user-route');
app.use(advertisementRoutes);
app.use(userRoutes);

app.listen(secret.port, function(err){
    if(err) throw err;
    console.log("Server started", "Post: ", secret.port);
});
