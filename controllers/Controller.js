/**
 * Basic controller
 * */
class Controller {
    /**
     * init data model
     * */
    constructor({model}){
        this.model = model;
    }

    /**
     * @param {string} type - model method
     * @param {object} params - {req, res, where, fields}
     *
     * @returns {(object | array)}
     * */
    async getHelper(type = "find", {req, res, where, fields}){
        try {
            if(where){

                return await this.model[type](where, fields);

            }else if(req){

                const { filter, fields, sort, limit } = req.query;
                const where = (filter && JSON.parse(filter)) || {};

                const baseQuery = this.model[type](where, fields);
                let result = null;

                if(sort && limit) result = await baseQuery.sort(JSON.parse(sort)).limit(parseInt(limit));
                else if(sort) result = await baseQuery.sort(JSON.parse(sort));
                else if(limit) result = await baseQuery.limit(parseInt(limit));
                else result = await baseQuery;

                res.send(result);
            }
        }catch (e) {
            this.handleError(e, {res});
        }
    }

    /**
     * find all records by filter
     *
     * @param {object} params - {req, res, where, fields}
     *
     * @returns {array} allRecords
     * */
    async getAll(params){
        try {

            return await this.getHelper("find", params);

        }catch (e) {
            this.handleError(e, params);
        }
    }

    /**
     * find one record by filter
     *
     * @param {object} params
     *
     * @returns {object} record
     * */
    async getOne(params){
        try {

            return await this.getHelper("findOne", params);

        }catch (e) {
            this.handleError(e, params);
        }
    }

    /**
     * create record
     *
     * @param {object} params - {req, res, data}
     *
     * @returns {object} new record
     * */
    async create({req, res, data}){
        try {

            const { body } = req || {};

            const newRecord = new this.model(data || body);

            await newRecord.save();

            if(req) res.send(newRecord);
            else return newRecord;

        }catch (e) {
            if(res) res.status(403).send({error: e.toString()});
            else throw new Error(e);
        }
    }

    /**
     * @param {object} - {req, res, id, data}
     * */
    async update({req, res, id, data}){
        try {

            const { body, params } = req || {};

            const result = await this.model.updateOne({ _id: params && params.id || id }, body || data);

            if(res) res.send(result);
            else return result;

        }catch (e) {
            this.handleError(e, {res});
        }
    }

    /**
     * @param {object} - {req: {params}, res, id}
     * */
    async delete({req: {params}, res, id}){
        try {

            const result = await this.model.deleteOne({_id: params.id || id});

            if(params) res.send(result);
            else return result;

        }catch (e) {
            this.handleError(e, {res});
        }
    }

    /**
     * handle default errors
     *
     * @param {string} e - error
     * @param {object} params - {res}
     * */
    handleError(e, {res}){
        if(process.env.NODE_ENV === "development") console.error(e);

        if(res) res.status(403).send({error: e.toString()});
        else throw new Error(e);
    }
}

module.exports = Controller;