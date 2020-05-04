class Currency{
    constructor({ name, price }){
        this._name = name;
        this._price = price;

        return { name, price };
    }
}

module.exports = Currency;