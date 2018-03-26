const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    winCount: {
        type: Number,
        required: true
    },
    lossCount: {
        type: Number,
        required: true
    },
    matches: [String]
});

PlayerSchema.pre("save", function (cb) {
    const player = this;
    if (!player.isModified("password")) {
        return cb();
    }
    // password is changed so we need to rehash it
    bcrypt.genSalt(5, (err, salt) => {
        if (err) {
            return cb(err);
        }
        bcrypt.hash(player.password, salt, null, (err, hash) => {
            if (err) {
                return cb(err);
            }
            player.password = hash;
            cb();
        });
    });
});

PlayerSchema.methods.verifyPassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

PlayerSchema.statics = {
    get: function (query, cb) {
        this.findOne(query, {
            password: 0
        }, cb);
    },
    getAll: function (cb) {
        this
            .find()
            .select({password: 0})
            .exec(cb);
    },
    updateByID: function (id, updateData, cb) {
        this.findOneAndUpdate({
            _id: id
        }, updateData, cb);
    },
    removeByID: function (removeData, cb) {
        this.remove(removeData, cb);
    },
    create: function (data, cb) {
        const player = new this(data);
        player.save(cb);
    }
};

module.exports = mongoose.model("Player", PlayerSchema);