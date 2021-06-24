const model = require("../models/Investment");
const Controller = require("./Controller");

class InvestmentController extends Controller {
    constructor(props) {
        super(props);
    }
}

module.exports = new InvestmentController({ model });
