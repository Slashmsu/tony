/**
 * Created by SlashMSU on 29/11/2016.
 */
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var secret = require('./config/secret');

var Advertisement = require('./models/advertisement-model');

var app = express();

mongoose.connect(secret.database, function(err) {
    if (err)
        console.log(err);
    else
        console.log('Connected to database');
});

//Middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var advertisementRoutes = require('./routes/advertisement-route');
app.use(advertisementRoutes);

app.listen(secret.port, function(err){
    if(err) throw err;
    console.log("Server started", "Post: ", secret.port);
});
