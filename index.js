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

//init API routes
routes.forEach(({method, route, controller}) => {
    app[method](route, controller);
});

app.listen(PORT, serverBoot);

require("./models/User");
require("./models/Category");
require("./models/Currency");

module.exports = app;