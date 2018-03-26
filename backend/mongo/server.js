// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const expressLogging = require("express-logging");
const logger = require("logops");
const cors = require("cors");

// Express config
const port = process.env.PORT || 3000;
const app = express();
const router = express.Router();

// Controllers
const playerController = require("./controllers/player");
const matchController = require("./controllers/match");
const authController = require("./controllers/auth");

// Mongo config
mongoose
    .connection
    .on("error", (err) => console.log(err.stack));
mongoose
    .connection
    .on("connected", () => console.log("Connected to DB!"));
mongoose.connect("mongodb://elot:testdb@18.188.26.113:27017/leaderboardDB");

// Express middleware
app.use(cors({origin: "*"}));
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressLogging(logger));

// Routes
router
    .route("/player")
    .post(playerController.createPlayer)
    .get(playerController.getAll);

router
    .route("/player/:id")
    .get(playerController.getPlayer)
    .put(authController.isAuthenticated, playerController.updatePlayer)
    .delete(authController.isAuthenticated, playerController.deletePlayer);

router
    .route("/match")
    .post(authController.isAuthenticated, matchController.createMatch)
    .get(matchController.getAll);

router
    .route("/match/:id")
    .get(matchController.getMatch)
    .delete(matchController.deleteMatch);

app.use("/api", router);

// Start Server
app.listen(port, (err) => {
    if (err) {
        return console.log(err.stack);
    }
    console.log(`Successfully running on port ${port}`);
});