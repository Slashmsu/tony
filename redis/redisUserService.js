var redis = require("redis");
var client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

module.exports = {

    setUser: function(key, user) {
        delete user.password;
        client.set(key, JSON.stringify(user));
    },

    getUser: function(key) {
        client.get(key, function (err, reply) {
            console.log(reply.toString()); // Will print `OK`
        });
    }

};