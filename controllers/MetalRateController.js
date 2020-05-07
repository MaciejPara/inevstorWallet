const model = require("../models/MetalRate");
const Controller = require("./Controller");

class MetalRateController extends Controller{
    constructor(props){
        super(props);
    }
}

module.exports = new MetalRateController({ model });