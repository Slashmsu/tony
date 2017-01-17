var casual = require('casual');
const User = require("../models/user-model");
const mongoose = require("mongoose");
const secret = require("../config/secret");

//ES 6 Promises
mongoose.Promise = global.Promise;

// Connection to mongoDb
mongoose.connect(secret.database);
mongoose.connection.once("open", function () {
    console.log("Connected to mongoDb successful!!!");
}).on("error", function (error) {
    console.log("Connection error: ", error);
});


for(var i = 0; i <= 100; i++) {
    var user = new User({
        name:  casual.first_name,
        secondName: casual.last_name,
        email:   casual.email,
        password:   casual.password,
        age:        casual.integer(from = 10, to = 99),
        created_at: new Date(),
        updated_at: new Date()
    });
    user.save().then(function (savedUser) {
        console.log(savedUser);
    });
}

console.log("Finished!!!");
