const Player = require("../models/player");
const Match = require("../models/match");
const trueskill = require("ts-trueskill");
trueskill.TrueSkill();

function getRatingChanges(match, cb) {
    let p1Change = 0;
    let p2Change = 0;
    let player1Rating;
    let player2Rating;

    Player.findOne({
        name: match.player1Name
    }, (err, player1Result) => {
        if (err) {
            return cb(err);
        }
        // no user found with first name
        if (!player1Result) {
            return cb("No user found with name " + match.player1Name);
        }
        player1Rating = new trueskill.Rating(player1Result.mu, player1Result.sigma);
        Player.findOne({
            name: match.player2Name
        }, (err, player2Result) => {
            if (err) {
                return cb(err);
            }
            // no user found with second name
            if (!player2Result) {
                return cb("No user found with name " + match.player2Name);
            }
            player2Rating = new trueskill.Rating(player2Result.mu, player2Result.sigma);
            let results = [];
            if (match.player1Score > match.player2Score) {
                results = trueskill.rate([[player1Rating], [player2Rating]
                ]);
            } else if (match.player1Score < match.player2Score) {
                results = trueskill.rate([[player2Rating], [player1Rating]
                ]);
            }

            let player1NewRating = results[0];
            let player2NewRating = results[1];

            player1NewRating = player1NewRating[0];
            player2NewRating = player2NewRating[0];
            p1Change = Math.round(player1NewRating.mu * 100) - Math.round(player1Rating.mu * 100);
            p2Change = Math.round(player2NewRating.mu * 100) - Math.round(player2Rating.mu * 100);
            cb(null, {p1Change, p2Change});

            // Can update the users without the rating changes done yet

            Player.findOneAndUpdate({
                name: match.player1Name
            }, {
                mu: player1NewRating.mu,
                sigma: player1NewRating.sigma
            }, (err, player1Result) => {
                if (err) {
                    return cb(err);
                }
            });
            Player.findOneAndUpdate({
                name: match.player2Name
            }, {
                mu: player2NewRating.mu,
                sigma: player2NewRating.sigma
            }, (err, player2Result) => {
                if (err) {
                    return cb(err);
                }
            });
        });
    });
}
// Plural requests
exports.createMatch = (req, res) => {
    const match = {
        player1Name: req.body.player1Name,
        player2Name: req.body.player2Name,
        player1Score: req.body.player1Score,
        player2Score: req.body.player2Score
    };

    getRatingChanges(match, (err, ratingResults) => {
        if (err) {
            return res
                .status(500)
                .json({err});
        }
        match.player1RatingChange = ratingResults.p1Change;
        match.player2RatingChange = ratingResults.p2Change;

        Match.create(match, (err, result) => {
            if (err) {
                return res
                    .status(500)
                    .send("There was a problem adding a match to the database " + err.stack);
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
                        .json({message: "Error adding match"});
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
                            .json({message: "Error adding match"});
                    }
                    res
                        .status(200)
                        .json(result);
                });
            });
        });
    });
};

exports.getAll = (req, res) => {
    Match.getAll((err, result) => {
        if (err) {
            return res
                .status(500)
                .json({err});
        }
        res
            .status(200)
            .json(result);
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
                .json({message: "There was a problem finding the match"});
        }
        if (!result) {
            return res
                .status(404)
                .json({message: `No match found with id ${req.params.id}`});
        }
        res
            .status(200)
            .json(result);
    });
};

exports.deleteMatch = (req, res) => {
    Match.removeByID({
        _id: req.params.id
    }, (err, result) => {
        if (err) {
            return res
                .status(500)
                .json({message: "There was a problem finding the match"});
        }
        if (!result) {
            return res
                .status(404)
                .json({message: `No match found with id ${req.params.id}`});
        }
        res
            .status(200)
            .json(result);
    });
};
