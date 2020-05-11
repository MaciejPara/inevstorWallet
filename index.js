// init env variables // set as high as it possible in the index.js
require("dotenv").config({ path: process.env.NODE_ENV === "development" ? "./.env" : "./.env-production" });
const express = require("express");
const expressSession = require("express-session");
const app = express();
const { PORT } = process.env;
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cookieParser = require("cookie-parser");
const serverBoot = require("./boot");
const routes = require("./routes/index");
const MongoStore = require("connect-mongodb-session")(expressSession);


/**
 *
 *
 *
 * @todo clean it up !!!!!!!!!!!
 *
 *
 *
 *
 * */





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(expressSession({
    secret: "This is a secret",
    store: new MongoStore({
        uri: "mongodb://localhost:27017/investorWallet",
        collection : "sessions"
    }),
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * init local strategy
 * */
passport.use(new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    function(email, password, done) {
        User.findOne({ email }, function (err, user) {
            if (err) return done(err);
            if (!user) return done(null, false);

            user.comparePassword(password, done);
        });
    }
));

app.post("/signin", passport.authenticate("local"), (req, res) => res.send({status: 200}));
app.get("/signout", (req, res) => {
    req.session.destroy();
    res.send({status: 200});
});

const checkIfUserIsAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) next();
    else next("Unauthorized");
};

/**
 * init API routes
 */
routes.forEach(({method, route, controller}) => {
    app[method](route, checkIfUserIsAuthenticated, controller);
});

/**
 * init data models
 * */
const User = require("./models/User");
require("./models/Category");
require("./models/Currency");
require("./models/CurrencyRate");
require("./models/Crypto");
require("./models/CryptoRate");
require("./models/Metal");
require("./models/MetalRate");

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (userId, done) {
    User.findById(userId, function (err, user) {
        done(err, user);
    });
});

/**
 * serve app & run initial operations
 * */
app.listen(PORT, serverBoot);



module.exports = app;