const model = require("../models/Metal");
const Controller = require("./Controller");

class MetalController extends Controller{
    constructor(props){
        super(props);
    }
}

module.exports = new MetalController({ model });