const BasePathController = require("../controllers/BasePathController");
const UserController = require("../controllers/UserController");
const CategoryController = require("../controllers/CategoryController");
const CurrencyController = require("../controllers/CurrencyController");


//@todo thing about optimization
module.exports = [
    { method: "get", route: "/", controller: BasePathController },

    // user
    { method: "get", route: "/users", controller: (req, res) => UserController.getAll({req, res}) },
    { method: "post", route: "/user", controller: (req, res) => UserController.setUser(req, res) },
    { method: "get", route: "/user/:id", controller: (req, res) => UserController.getOne({req, res}) },
    { method: "delete", route: "/user/:id", controller: (req, res) => UserController.delete({req, res}) },
    { method: "patch", route: "/user/:id", controller: (req, res) => UserController.update({req, res}) },

    // category
    { method: "get", route: "/categories", controller: (req, res) => CategoryController.getAll({req, res}) },
    { method: "post", route: "/category", controller: (req, res) => CategoryController.create({req, res}) },
    { method: "get", route: "/category/:id", controller: (req, res) => CategoryController.getOne({req, res}) },
    { method: "delete", route: "/category/:id", controller: (req, res) => CategoryController.delete({req, res}) },
    { method: "patch", route: "/category/:id", controller: (req, res) => CategoryController.update({req, res}) },

    // currency
    { method: "get", route: "/currencies", controller: (req, res) => CurrencyController.getAll({req, res}) },
    { method: "post", route: "/currency", controller: (req, res) => CurrencyController.create({req, res}) },
    { method: "get", route: "/currency/:id", controller: (req, res) => CurrencyController.getOne({req, res}) },
    { method: "delete", route: "/currency/:id", controller: (req, res) => CurrencyController.delete({req, res}) },
    { method: "patch", route: "/currency/:id", controller: (req, res) => CurrencyController.update({req, res}) },
];
