const basePathController = require("../controllers/basePathController");
const userController = require("../controllers/userController");

module.exports = [
    { method: "get", route: "/", controller: basePathController },
    { method: "get", route: "/api", controller: basePathController },

    // user
    { method: "get", route: "/api/users", controller: userController.getUsers },
    { method: "post", route: "/api/user", controller: userController.setUser },
];
