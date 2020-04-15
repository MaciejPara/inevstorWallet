const basePathController = require("../controllers/basePathController");
const apiPathController = require("../controllers/apiPathController");

module.exports = [
    { method: "get", route: "/", controller: basePathController },
    { method: "get", route: "/api", controller: apiPathController },
];