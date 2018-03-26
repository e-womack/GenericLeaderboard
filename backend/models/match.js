const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
    player1Name: {
        type: String,
        required: true
    },
    player2Name: {
        type: String,
        required: true
    },
    player1Score: {
        type: Number,
        required: true
    },
    player2Score: {
        type: Number,
        required: true
    }
});

MatchSchema.statics = {
    get: function (query, cb) {
        this.findOne(query, cb);
    },
    getAll: function (cb) {
        this.find(cb);
    },
    removeByID: function (removeData, cb) {
        this.remove(removeData, cb);
    },
    create: function (data, cb) {
        const match = new this(data);
        match.save(cb);
    }
};

module.exports = mongoose.model("Match", MatchSchema);