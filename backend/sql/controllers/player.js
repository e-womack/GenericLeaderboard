const {queries, validity} = require("../utility");
const sqlconnection = require("../sqlconfig").connection;

exports.postPlayer = (req, res) => {
    const recievedObj = req.body;
    const validObj = validity.person(recievedObj);
    if (validObj) {
        queries.insert(res.json.bind(res), "Player", validObj);
    } else {
        res.send("Invalid Object");
    }
};

exports.updatePlayer = (req, res) => {};
exports.deletePlayer = (req, res) => {};

exports.getPlayer = (req, res) => {
    const post = {
        id: req.params.id
    };
    queries.selectAllWhere(res.json.bind(res), "Player", post);
};

exports.getPlayers = (req, res) => {
    queries.selectAll(res.json.bind(res), "Player");
};

exports.getTop5Players = (req, res) => {
    sqlconnection.query("select * from Player order by tskillrating desc limit 5", (err, results) => {
        if (err) {
            return res.send(err);
        }
        res.json(results);
    });
};