// Dependencies
const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;

// Models required for Authentication
const Player = require("../models/player");

passport.use(new BasicStrategy((username, password, cb) => {
    Player.findOne({
        name
    }, (err, player) => {
        if (err) {
            return cb(err);
        }
        // No user found
        if (!player) {
            return cb(null, false);
        }
        player.verifyPassword(password, (err, isMatch) => {
            if (err) {
                return cb(err);
            }
            // Password did not match
            if (!isMatch) {
                return cb(null, false);
            }
            // Success
            return cb(null, player);
        });
    });
}));

// Exports
exports.isAuthenticated = passport.authenticate("basic", {session: false});