const Currency = require("./Currency");

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

    getDataToStore(){
        const names = this.getCurrenciesNames();
        const rates = names.map(item => new Currency({ name: item, rate: this._rates[item].toFixed(3) }));

        return {
            rates,
            date: this.getDate(),
            base: this.getBase()
        };
    }
}

module.exports = CurrencyParser;
