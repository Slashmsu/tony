'use strict';

var router = require('express').Router();
var mime = require('mime');
var UserRepository = require('../repository/user-repository');
var passport = require('passport');
var jwt = require('jwt-simple');
var User = require('../models/user-model');
var config = require('../config/secret');
var redisUserService = require('../redis/redisUserService');

// pass passport for configuration
require('../config/passport')(passport);

//======================================================================================================================
// Signup
//======================================================================================================================

router.post('/signup', function(req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({success: false, msg: 'Please pass name and password.'});
    } else {
        var newUser = new User({
            name: req.body.name,
            secondName: req.body.secondName,
            email: req.body.email,
            password: req.body.password
        });
        newUser.save(function(err) {
            if (err) {
                console.log(err);
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});

//======================================================================================================================
// Authenticate
//======================================================================================================================

router.post('/authenticate', function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.encode(user, config.secretKey);
                    // return the information including token as JSON
                    user.password = null;
                    redisUserService.setUser(token, user);
                    res.json({success: true, token: token, user: user});
                } else {
                    res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});

//======================================================================================================================
// Log out
//======================================================================================================================

router.get('/log-out', function(req, res) {
    redisUserService.remove(req.token);
    return res.status(200).send({success: true, msg: 'Log Out'});
});

//======================================================================================================================
// Get get inf from current user
//======================================================================================================================

router.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secretKey);
        User.findOne({
            name: decoded.name
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
});

//======================================================================================================================
// Get user list
//======================================================================================================================

router.get('/user', function(req, res) {
    var mongooseFilter = require('../services/service-models/MongooseFilter');

    if ( req.query.offset !== undefined && req.query.limit !== undefined) {
        mongooseFilter.offset = parseInt(req.query.offset);
        mongooseFilter.limit = parseInt(req.query.limit);
    }

    if (req.query.keywords)
        mongooseFilter.keywords = req.query.keywords;
    else
        delete mongooseFilter.keywords;

    UserRepository.findWithParameters(mongooseFilter, function (foundUsers) {
        res.send(foundUsers);
    });
});

//======================================================================================================================
// Get user by id
//======================================================================================================================

router.get('/user/:id', function(req, res) {
    var mongooseFilter = require('../services/service-models/MongooseFilter');
    mongooseFilter.id = req.params.id;

    UserRepository.findById(mongooseFilter , function (foundUser) {
        res.send(foundUser);
    });
});

//======================================================================================================================
// Add user
//======================================================================================================================

router.post('/user', function(req, res) {
    UserRepository.save(req.body, function (saveUser) {
        res.send(saveUser);
    });
});

router.put('/user/:id', function(req, res){
    UserRepository.update(req.params.id, req.body , function (updaterUser) {
        res.send(updaterUser);
    });
});

//======================================================================================================================
// Remove user
//======================================================================================================================

router.delete('/user/:id', function(req, res) {
    UserRepository.remove(req.params.id , function () {
        res.status(200).send("Object with id " + req.params.id + " removed");
    });
});

//======================================================================================================================
// Functions
//======================================================================================================================

var getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

//======================================================================================================================
// Export
//======================================================================================================================

module.exports = router;