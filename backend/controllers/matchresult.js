const {
    queries,
    validity,
} = require("../utility");

exports.postMatchResult = (req, res) => {

};

exports.getMatchResult = (req, res) => {

};

exports.updateMatchResult = (req, res) => {};
exports.deleteMatchResult = (req, res) => {};

exports.getMatchResults = (req, res) => {
    queries.selectAll(res.json.bind(res), "PlayerMatches");
};