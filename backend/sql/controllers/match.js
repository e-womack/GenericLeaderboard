const {
    queries,
    validity,
} = require("../utility");

exports.postMatch = (req, res) => {

};

exports.getMatch = (req, res) => {

};

exports.updateMatch = (req, res) => {};
exports.deleteMatch = (req, res) => {};

exports.getMatchs = (req, res) => {
    queries.selectAll(res.json.bind(res), "MatchResult");
};