const privates = require("./privates.js");
const mysql = require("mysql");
const connection = mysql.createConnection({host: privates.dbIP, user: privates.dbUser, password: privates.dbPWD, database: privates.dbName});
exports.connection = connection;