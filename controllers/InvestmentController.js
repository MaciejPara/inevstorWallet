const model = require("../models/Investment");
const Controller = require("./Controller");
const mongoose = require("mongoose");
const { CurrencyRate } = mongoose.models;
const CurrencyRateController = require("./CurrencyRateController");

class InvestmentController extends Controller {
    constructor(props) {
        super(props);
    }

    /**
     * find all records by filter
     *
     * @param {object} params - {req, res, where, fields}
     *
     * @returns {array} allRecords
     * */
    async getAll(params) {
        try {
            return await this.getHelper("find", params);
        } catch (e) {
            this.handleError(e, params);
        }
    }

    /**
     * @param {string} type - model method
     * @param {object} params - {req, res, where, fields}
     *
     * @returns {(object | array)}
     * */
    async getHelper(type = "find", { req, res, where, fields }) {
        try {
            if (where) {
                return await this.model[type](where, fields);
            } else if (req) {
                const { filter, fields, sort, limit } = req.query;
                const where = (filter && JSON.parse(filter)) || {};

                const baseQuery = this.model[type](where, fields);
                let result = null;

                if (sort && limit)
                    result = await baseQuery
                        .sort(JSON.parse(sort))
                        .limit(parseInt(limit));
                else if (sort) result = await baseQuery.sort(JSON.parse(sort));
                else if (limit) result = await baseQuery.limit(parseInt(limit));
                else result = await baseQuery;

                res.send(result);
            }
        } catch (e) {
            this.handleError(e, { res });
        }
    }
}

module.exports = new InvestmentController({ model });
