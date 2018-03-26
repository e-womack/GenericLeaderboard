const Player = require("../models/player");
const Match = require("../models/match");

// Plural requests
exports.createMatch = (req, res) => {
    const match = {
        player1Name: req.body.player1Name,
        player2Name: req.body.player2Name,
        player1Score: req.body.player1Score,
        player2Score: req.body.player2Score
    };

    Match.create(match, (err, result) => {
        if (err) {
            return res
                .status(500)
                .send("There was a problem adding a match to the database");
        }
        Player.findOneAndUpdate({
            name: match.player1Name
        }, {
            $push: {
                "matches": `/${result._id}`
            },
            $inc: {
                "winCount": match.player1Score > match.player2Score
                    ? 1
                    : 0,
                "lossCount": match.player2Score > match.player1Score
                    ? 1
                    : 0
            }
        }, {
            new: true
        }, (err, player1result) => {
            if (err) {
                return res
                    .status(500)
                    .send("Error adding match");
            }
            Player.findOneAndUpdate({
                name: match.player2Name
            }, {
                $push: {
                    "matches": `/${result._id}`
                },
                $inc: {
                    "winCount": match.player1Score > match.player2Score
                        ? 0
                        : 1,
                    "lossCount": match.player2Score > match.player1Score
                        ? 0
                        : 1
                }
            }, {
                new: true
            }, (err, player2result) => {
                if (err) {
                    return res
                        .status(500)
                        .send("Error adding match");
                }
                res
                    .status(200)
                    .send(result);
            });
        });
    });
};

exports.getAll = (req, res) => {
    Match.getAll((err, result) => {
        if (err) {
            return res
                .status(500)
                .send(err);
        }
        res
            .status(200)
            .send(result);
    });
};

// Singular Requests
exports.getMatch = (req, res) => {
    Match.get({
        _id: req.params.id
    }, (err, result) => {
        if (err) {
            return res
                .status(500)
                .send("There was a problem finding the match");
        }
        if (!result) {
            return res
                .status(404)
                .send(`No match found with id ${req.params.id}`);
        }
        res
            .status(200)
            .send(result);
    });
};

exports.deleteMatch = (req, res) => {
    Match.removeByID({
        _id: req.params.id
    }, (err, result) => {
        if (err) {
            return res
                .status(500)
                .send("There was a problem finding the match");
        }
        if (!result) {
            return res
                .status(404)
                .send(`No match found with id ${req.params.id}`);
        }
        res
            .status(200)
            .send(result);
    });
};
