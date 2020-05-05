const FindOrCreateRecords = require("../utils/FindOrCreateRecords");
const Currency = require("./Currency");
const CurrencyModel = require("../models/Currency");

class CurrencyParser{
    constructor({rates, base, date}){
        if(!rates) throw new Error("Data are not valid currency object");

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

    getCurrenciesNames(){
        return Object.keys(this._rates);
    }

    /**
     * @returns {object} - data to save in db
     * */
    getDataToStore(){
        const names = this.getCurrenciesNames();
        const rates = names.map(item => new Currency({ name: item, rate: this._rates[item].toFixed(3) }));

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
                findElements: this.getCurrenciesNames(),
                model: CurrencyModel,
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

module.exports = CurrencyParser;
