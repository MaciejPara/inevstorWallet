const model = require("../models/StockRate");
const Controller = require("./Controller");

class StockRateController extends Controller {
    constructor(props) {
        super(props);
    }
}

module.exports = new StockRateController({ model });
