const model = require("../models/Stock");
const Controller = require("./Controller");

class StockController extends Controller {
    constructor(props) {
        super(props);
    }
}

module.exports = new StockController({ model });
