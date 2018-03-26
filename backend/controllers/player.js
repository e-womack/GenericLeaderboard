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
        tskillrating: 1500,
        winCount: 0,
        lossCount: 0
    };

    playerExists(player, (err) => {
        if (err) {
            return res
                .status(500)
                .send(err);
        }
        Player.create(player, (err, result) => {
            if (err) {
                return res
                    .status(500)
                    .send(err);
            }
            res
                .status(200)
                .send(result);
        });
    });
};

exports.getAll = (req, res) => {
    Player.getAll((err, result) => {
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
exports.getPlayer = (req, res) => {
    Player.get({
        _id: req.params.id
    }, (err, result) => {
        if (err) {
            return res
                .status(500)
                .send("There was a problem finding the player");
        }
        if (!result) {
            return res
                .status(404)
                .send(`No player found with id ${req.params.id}`);
        }
        res
            .status(200)
            .send(result);
    });
};

exports.deletePlayer = (req, res) => {
    Player.removeByID({
        _id: req.params.id
    }, (err, result) => {
        if (err) {
            return res
                .status(500)
                .send("There was a problem finding the player");
        }
        if (!result) {
            return res
                .status(404)
                .send(`No player found with id ${req.params.id}`);
        }
        res
            .status(200)
            .send(result);
    });
};

exports.updatePlayer = (req, res) => {
    Player.updateByID(req.params.id, req.body, (err, result) => {
        if (err) {
            return res
                .status(500)
                .send("There was a problem finding the player");
        }
        if (!result) {
            return res
                .status(404)
                .send(`No player found with id ${req.params.id}`);
        }
        res
            .status(200)
            .send(result);
    });
};