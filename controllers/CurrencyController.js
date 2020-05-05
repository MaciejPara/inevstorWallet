const CurrencyModel = require("../models/Currency");
const Controller = require("./Controller");

class CurrencyController extends Controller{
    constructor(props){
        super(props);
    }
}

module.exports = new CurrencyController({ model: CurrencyModel });