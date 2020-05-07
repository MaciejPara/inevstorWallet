// init env variables // set as high as it possible in the index.js
require("dotenv").config({ path: process.env.NODE_ENV === "development" ? "./.env" : "./.env-production" });
const express = require("express");
const app = express();
const { PORT } = process.env;
const bodyParser = require("body-parser");

const serverBoot = require("./boot");
const routes = require("./routes/index");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * init API routes
 */
routes.forEach(({method, route, controller}) => {
    app[method](route, controller);
});

/**
 * serve app & run initial operations
 * */
app.listen(PORT, serverBoot);

/**
 * init data models
 * */
require("./models/User");
require("./models/Category");
require("./models/Currency");
require("./models/CurrencyRate");
require("./models/Crypto");
require("./models/CryptoRate");
require("./models/Metal");
require("./models/MetalRate");

module.exports = app;