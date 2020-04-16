const CategoryModel = require("../models/Category");
const Controller = require("./Controller");

class CategoryController extends Controller{
    constructor(props){
        super(props);
    }
}

module.exports = new CategoryController({ model: CategoryModel });