class Currency{
    constructor({ name, rate }){
        this._name = name;
        this._rate = rate;

        return { name, rate };
    }
}

module.exports = Currency;