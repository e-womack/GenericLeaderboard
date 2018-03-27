const Player = require("../models/player");

const playerExists = (player, cb) => {
    Player.find({
        $or: [
            {
                "name": player.name
            }, {
                "email": player.email
            }
        ]
    }, (err, player) => {
        if (err || player.length > 0) {
            return cb("User already exists");
        }
        console.log(player);
        cb();
    });
};
// Plural requests
exports.createPlayer = (req, res) => {
    const player = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        mu: 25,
        sigma: 1.618,
        winCount: 0,
        lossCount: 0
    };

    playerExists(player, (err) => {
        if (err) {
            return res
                .status(500)
                .json({err});
        }
        Player.create(player, (err, result) => {
            if (err) {
                return res
                    .status(500)
                    .json({err});
            }
            res
                .status(200)
                .json(result);
        });
    });
};

exports.getAll = (req, res) => {
    Player.getAll((err, result) => {
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
exports.getPlayer = (req, res) => {
    Player.get({
        _id: req.params.id
    }, (err, result) => {
        if (err) {
            return res
                .status(500)
                .json({message: "There was a problem finding the player"});
        }
        if (!result) {
            return res
                .status(404)
                .json({message: `No player found with id ${req.params.id}`});
        }
        res
            .status(200)
            .json(result);
    });
};

exports.deletePlayer = (req, res) => {
    Player.removeByID({
        _id: req.params.id
    }, (err, result) => {
        if (err) {
            return res
                .status(500)
                .json({message: "There was a problem finding the player"});
        }
        if (!result) {
            return res
                .status(404)
                .json({message: `No player found with id ${req.params.id}`});
        }
        res
            .status(200)
            .json(result);
    });
};

exports.updatePlayer = (req, res) => {
    Player.updateByID(req.params.id, req.body, (err, result) => {
        if (err) {
            return res
                .status(500)
                .json({message: "There was a problem finding the player"});
        }
        if (!result) {
            return res
                .status(404)
                .json({message: `No player found with id ${req.params.id}`});
        }
        res
            .status(200)
            .json(result);
    });
};