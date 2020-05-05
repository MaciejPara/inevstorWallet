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

    getCurrenciesPrice(){
        const names = this.getCurrenciesNames();

        return names.map(item => new Currency({ name: item, price: this._rates[item] }));
    }
}

module.exports = CurrencyParser;
