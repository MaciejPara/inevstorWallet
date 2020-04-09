// init env variables // set as high as it possible in the index.js
require('dotenv').config({ path: process.env.NODE_ENV === "development" ? "./.env" : "./.env-production" });

const express = require('express');
const app = express();
const { PORT } = process.env;

const serverBoot = require("./boot");
const routes = require("./routes");

//init API routes
routes.forEach(({method, route, controller}) => {
    app[method](route, controller);
});

app.listen(PORT, serverBoot);

module.exports = app;