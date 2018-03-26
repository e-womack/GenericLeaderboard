// Dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();

// Config
const sqlconnection = require("./sqlconfig").connection;
const apiPort = 3000;
app.use(cors({origin: "*"}));

// Connect to the database
sqlconnection.connect((err) => {
    if (err) {
        console.log("Error Connecting to DB: ", err.stack);
    } else {
        console.log("Connected Successfully with ID: ", sqlconnection.threadId);
    }
});

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`[LOG] 
    Date:[${new Date().toISOString()}] 
    Method: ${req.method} 
    Body: ${JSON.stringify(req.body)}`);
    next();
});

// Controllers
const playerController = require("./controllers/player");
const matchController = require("./controllers/match");
const matchResultController = require("./controllers/matchresult");

// Routes
router
    .route("/player")
    .get(playerController.getPlayers)
    .post(playerController.postPlayer);

router
    .route("/player/:id")
    .get(playerController.getPlayer)
    .delete(playerController.deletePlayer)
    .put(playerController.updatePlayer);

router
    .route("/top5player")
    .get(playerController.getTop5Players);

router
    .route("/match")
    .get(matchController.getMatchs)
    .post(matchController.postMatch);

router
    .route("/match/:id")
    .get(matchController.getMatch)
    .delete(matchController.deleteMatch)
    .put(matchController.updateMatch);

router
    .route("/matchresult")
    .get(matchResultController.getMatchResults)
    .post(matchResultController.postMatchResult);

router
    .route("/matchresult/:id")
    .get(matchResultController.getMatchResult)
    .delete(matchResultController.deleteMatchResult)
    .put(matchResultController.updateMatchResult);

app.use("/api", router);

// Start the server on port 3000
app.listen(apiPort, (err) => {
    if (err) {
        return console.log("Error starting server: ", err.stack);
    }
    console.log(`Server running on port ${apiPort}`);
});