const FindOrCreateRecords = require("../utils/FindOrCreateRecords");
const Crypto = require("./Crypto");
const CryptoModel = require("../models/Crypto");

class CryptoParser{
    constructor({rates, base, date}){
        if(!rates) throw new Error("Data are not valid metal object");

        this._rates = rates;
        this._base = base;
        this._date = date;
    }

    getBase(){
        return this._base;
    }

    getDate(){
        return this._date;
    }

    getMetalsNames(){
        return Object.keys(this._rates);
    }

    /**
     * @returns {object} - data to save in db
     * */
    getDataToStore(){
        const names = this.getMetalsNames();
        const rates = names.map(item => new Crypto({ name: item, rate: this._rates[item].toFixed(3) }));

        return {
            rates,
            date: this.getDate(),
            base: this.getBase()
        };
    }

    /**
     * saves currencies names into db collection
     * */
    async saveNewRecords(){
        try {
            await new FindOrCreateRecords({
                findElements: this.getMetalsNames(),
                model: CryptoModel,
                match: "name",
                createSchema: {
                    name: "string"
                }
            }).exec();
        }catch (e) {
            throw e;
        }
    }
}

module.exports = CryptoParser;
