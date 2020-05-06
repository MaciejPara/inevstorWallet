const model = require("../models/Crypto");
const Controller = require("./Controller");

class CryptoController extends Controller{
    constructor(props){
        super(props);
    }
}

module.exports = new CryptoController({ model });