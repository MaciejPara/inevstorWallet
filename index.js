/**
 * init env variables // set as high as it possible in the index.js
 */
require("dotenv").config({
    path:
        process.env.NODE_ENV === "development" ? "./.env" : "./.env-production",
});

const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const { PORT } = process.env;

const serverBoot = require("./boot");
const routes = require("./routes/index");
const PassportHandler = require("./utils/PassportHandler");

app.set("trust proxy", 1);
app.use(
    cors({
        origin: ["http://localhost:3000", "https://maciejpara.github.io"],
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(PassportHandler.expressSession());
app.use(PassportHandler.initialize());
app.use(PassportHandler.session());

/**
 * init local strategy
 * */
passport.use(PassportHandler.localStrategy());
passport.serializeUser(PassportHandler.serializeUser);
passport.deserializeUser(PassportHandler.deserializeUser);

/**
 * init API routes
 */ //@todo optimize
app.post("/signup", PassportHandler.signup);
app.get("/confirm", PassportHandler.confirmSignup);
app.post("/signin", PassportHandler.authenticate(), PassportHandler.signin);
app.get("/signout", PassportHandler.signout);

routes.forEach(({ method, route, controller }) => {
    app[method](route, PassportHandler.checkIfUserIsAuthenticated, controller);
});

/**
 * init data models
 * */
[
    "./models/User",
    "./models/Category",
    "./models/Currency",
    "./models/CurrencyRate",
    "./models/Crypto",
    "./models/CryptoRate",
    "./models/Metal",
    "./models/MetalRate",
    "./models/Stock",
    "./models/StockRate",
].forEach((item) => {
    require(item);
});

/**
 * serve app & run initial operations
 * */
app.listen(PORT, serverBoot);

module.exports = app;
