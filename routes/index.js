const BasePathController = require("../controllers/BasePathController");
const UserController = require("../controllers/UserController");
const CategoryController = require("../controllers/CategoryController");
const CurrencyController = require("../controllers/CurrencyController");
const CurrencyRateController = require("../controllers/CurrencyRateController");
const CryptoController = require("../controllers/CryptoController");
const CryptoRateController = require("../controllers/CryptoRateController");
const MetalController = require("../controllers/MetalController");
const MetalRateController = require("../controllers/MetalRateController");
const StockController = require("../controllers/StockController");
const StockRateController = require("../controllers/StockRateController");
const InvestmentController = require("../controllers/InvestmentController");

//@todo think about optimization && clear unused models
module.exports = [
    { method: "get", route: "/", controller: BasePathController },

    // user
    {
        method: "get",
        route: "/users",
        controller: (req, res) => UserController.getAll({ req, res }),
    },
    {
        method: "post",
        route: "/user",
        controller: (req, res) => UserController.setUser(req, res),
    },
    {
        method: "get",
        route: "/user/:id",
        controller: (req, res) => UserController.getOne({ req, res }),
    },
    {
        method: "delete",
        route: "/user/:id",
        controller: (req, res) => UserController.delete({ req, res }),
    },
    {
        method: "patch",
        route: "/user/:id",
        controller: (req, res) => UserController.update({ req, res }),
    },

    // category
    {
        method: "get",
        route: "/categories",
        controller: (req, res) => CategoryController.getAll({ req, res }),
    },
    {
        method: "post",
        route: "/category",
        controller: (req, res) => CategoryController.create({ req, res }),
    },
    {
        method: "get",
        route: "/category/:id",
        controller: (req, res) => CategoryController.getOne({ req, res }),
    },
    {
        method: "delete",
        route: "/category/:id",
        controller: (req, res) => CategoryController.delete({ req, res }),
    },
    {
        method: "patch",
        route: "/category/:id",
        controller: (req, res) => CategoryController.update({ req, res }),
    },

    // currency
    {
        method: "get",
        route: "/currencies",
        controller: (req, res) => CurrencyController.getAll({ req, res }),
    },
    {
        method: "post",
        route: "/currency",
        controller: (req, res) => CurrencyController.create({ req, res }),
    },
    {
        method: "get",
        route: "/currency/:id",
        controller: (req, res) => CurrencyController.getOne({ req, res }),
    },
    {
        method: "delete",
        route: "/currency/:id",
        controller: (req, res) => CurrencyController.delete({ req, res }),
    },
    {
        method: "patch",
        route: "/currency/:id",
        controller: (req, res) => CurrencyController.update({ req, res }),
    },

    // currency rate
    {
        method: "get",
        route: "/currencyRates",
        controller: (req, res) => CurrencyRateController.getAll({ req, res }),
    },
    {
        method: "post",
        route: "/currencyRate",
        controller: (req, res) => CurrencyRateController.create({ req, res }),
    },
    {
        method: "get",
        route: "/currencyRate/:id",
        controller: (req, res) => CurrencyRateController.getOne({ req, res }),
    },
    {
        method: "delete",
        route: "/currencyRate/:id",
        controller: (req, res) => CurrencyRateController.delete({ req, res }),
    },
    {
        method: "patch",
        route: "/currencyRate/:id",
        controller: (req, res) => CurrencyRateController.update({ req, res }),
    },

    // crypto
    {
        method: "get",
        route: "/cryptos",
        controller: (req, res) => CryptoController.getAll({ req, res }),
    },
    {
        method: "post",
        route: "/crypto",
        controller: (req, res) => CryptoController.create({ req, res }),
    },
    {
        method: "get",
        route: "/crypto/:id",
        controller: (req, res) => CryptoController.getOne({ req, res }),
    },
    {
        method: "delete",
        route: "/crypto/:id",
        controller: (req, res) => CryptoController.delete({ req, res }),
    },
    {
        method: "patch",
        route: "/crypto/:id",
        controller: (req, res) => CryptoController.update({ req, res }),
    },

    // crypto rate
    {
        method: "get",
        route: "/cryptoRates",
        controller: (req, res) => CryptoRateController.getAll({ req, res }),
    },
    {
        method: "post",
        route: "/cryptoRate",
        controller: (req, res) => CryptoRateController.create({ req, res }),
    },
    {
        method: "get",
        route: "/cryptoRate/:id",
        controller: (req, res) => CryptoRateController.getOne({ req, res }),
    },
    {
        method: "delete",
        route: "/cryptoRate/:id",
        controller: (req, res) => CryptoRateController.delete({ req, res }),
    },
    {
        method: "patch",
        route: "/cryptoRate/:id",
        controller: (req, res) => CryptoRateController.update({ req, res }),
    },

    // crypto
    {
        method: "get",
        route: "/metals",
        controller: (req, res) => MetalController.getAll({ req, res }),
    },
    {
        method: "post",
        route: "/metal",
        controller: (req, res) => MetalController.create({ req, res }),
    },
    {
        method: "get",
        route: "/metal/:id",
        controller: (req, res) => MetalController.getOne({ req, res }),
    },
    {
        method: "delete",
        route: "/metal/:id",
        controller: (req, res) => MetalController.delete({ req, res }),
    },
    {
        method: "patch",
        route: "/metal/:id",
        controller: (req, res) => MetalController.update({ req, res }),
    },

    // crypto rate
    {
        method: "get",
        route: "/metalRates",
        controller: (req, res) => MetalRateController.getAll({ req, res }),
    },
    {
        method: "post",
        route: "/metalRate",
        controller: (req, res) => MetalRateController.create({ req, res }),
    },
    {
        method: "get",
        route: "/metalRate/:id",
        controller: (req, res) => MetalRateController.getOne({ req, res }),
    },
    {
        method: "delete",
        route: "/metalRate/:id",
        controller: (req, res) => MetalRateController.delete({ req, res }),
    },
    {
        method: "patch",
        route: "/metalRate/:id",
        controller: (req, res) => MetalRateController.update({ req, res }),
    },

    // stock
    {
        method: "get",
        route: "/stocks",
        controller: (req, res) => StockController.getAll({ req, res }),
    },
    {
        method: "post",
        route: "/stock",
        controller: (req, res) => StockController.create({ req, res }),
    },
    {
        method: "get",
        route: "/stock/:id",
        controller: (req, res) => StockController.getOne({ req, res }),
    },
    {
        method: "delete",
        route: "/stock/:id",
        controller: (req, res) => StockController.delete({ req, res }),
    },
    {
        method: "patch",
        route: "/stock/:id",
        controller: (req, res) => StockController.update({ req, res }),
    },

    // stock rates
    {
        method: "get",
        route: "/stockRates",
        controller: (req, res) => StockRateController.getAll({ req, res }),
    },
    {
        method: "post",
        route: "/stockRate",
        controller: (req, res) => StockRateController.create({ req, res }),
    },
    {
        method: "get",
        route: "/stockRate/:id",
        controller: (req, res) => StockRateController.getOne({ req, res }),
    },
    {
        method: "delete",
        route: "/stockRate/:id",
        controller: (req, res) => StockRateController.delete({ req, res }),
    },
    {
        method: "patch",
        route: "/stockRate/:id",
        controller: (req, res) => StockRateController.update({ req, res }),
    },

    // investment
    {
        method: "get",
        route: "/investments",
        controller: (req, res) => InvestmentController.getAll({ req, res }),
    },
    {
        method: "post",
        route: "/investment",
        controller: (req, res) => InvestmentController.create({ req, res }),
    },
    {
        method: "get",
        route: "/investment/:id",
        controller: (req, res) => InvestmentController.getOne({ req, res }),
    },
    {
        method: "delete",
        route: "/investment/:id",
        controller: (req, res) => InvestmentController.delete({ req, res }),
    },
    {
        method: "patch",
        route: "/investment/:id",
        controller: (req, res) => InvestmentController.update({ req, res }),
    },
];
