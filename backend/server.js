//Dependencies
const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");


//Config
const privates = require("./privates.js");
const connection = mysql.createConnection({
    host: privates.dbIP,
    user: privates.dbUser,
    password: privates.dbPWD,
    database: privates.dbName
});
const serverPort = 3000;

//Connect to the database
connection.connect((err) => {
    if (err) {
        console.log("Error Connecting to DB: ", err.stack);
    }
    else {
        console.log("Connected Successfully with ID: ", connection.threadId);
    }
});

//house for queries
const queries = {
    selectAll: (cb, tableName) => {
        connection.query(`SELECT * from ${tableName}`, (err, results) => {
            if (err) { throw err; }
            else {
                cb(results);
            }
        });
    },
    selectWhere: (cb, tableName, post) => {
        let query = `Select * from ${tableName} WHERE ?`;
        let tmp = connection.query(query, post, (err, results) => {
            cb(results);
        });
    },
    insert: (responseCallback, tableName, validObject) => {
        let query = `INSERT into ${tableName} values (null`;
        for (let key in validObject) {
            query += `, '${validObject[key]}'`;
        }
        query += ");";
        connection.query(query, (err, results) => {
            responseCallback(validObject);
        });
    }
}

//Validity checks for POST/PUT objects in request bodies
const validity = {
    person: ({ name, imgurl, tskillrating }) => {
        const isValid = (name) && (imgurl) && (tskillrating)
        if (isValid) {
            return { name, imgurl, tskillrating };
        }
    }
}

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//GET Requests
app.get("/player", (req, res) => {
    queries.selectAll(res.json.bind(res), "Player");
});

app.get("/player/:id", (req, res) => {
    const post = { id: req.params.id };
    queries.selectWhere(res.json.bind(res), "Player", post);
});

app.get("/match", (req, res) => {
    queries.selectAll(res.json.bind(res), "MatchResult");
});

app.get("/matchresult", (req, res) => {
    queries.selectAll(res.json.bind(res), "PlayerMatches");
});

//POST Requests
app.post("/player", (req, res) => {
    const recievedObj = req.body;
    const validObj = validity.person(recievedObj);
    if (validObj) {
        queries.insert(res.json.bind(res), "Player", validObj);
    } else {
        res.send("Invalid Object");
    }
});

//Start the server on port 3000
app.listen(serverPort, (err) => {
    if (err) { console.log("Error starting server: ", err.stack); }
    else {
        console.log(`Server running on port ${serverPort}`);
    }
});