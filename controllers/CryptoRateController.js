const model = require("../models/CryptoRate");
const Controller = require("./Controller");

class CryptoRateController extends Controller{
    constructor(props){
        super(props);
    }
}

module.exports = new CryptoRateController({ model });