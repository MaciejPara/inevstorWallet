const FindOrCreateRecords = require("../utils/FindOrCreateRecords");
const Stock = require("./Stock");
const StockModel = require("../models/Stock");
const cheerio = require("cheerio");

class StockParser {
    static fetchType = "text";

    constructor(data) {
        // if(!rates) throw new Error("Data are not valid currency object");
        //
        this._rates = {};
        this._base = "PLN";
        this._date = new Date(); // @todo get from site

        this.fields = [
            {
                name: "name",
                selector: "tbody tr .colWalor a",
                values: [],
            },
            {
                name: "rate",
                selector: "tbody tr td.colKurs",
                values: [],
            },
            {
                name: "time",
                selector: "tbody tr td.colAktualizacja",
                values: [],
            },
        ];

        this.$ = cheerio.load(data);
        this.parseHTML();
    }

    parseHTML() {
        this.fields.forEach(({ selector, values }) => {
            const elements = this.$(selector);
            elements.map((item) => {
                const value = this.$(elements[item]).text();
                values.push(value);
            });
        });

        const names = this.fields.find(({ name }) => name === "name");
        const rates = this.fields.find(({ name }) => name === "rate");

        this._date = new Date();

        if (names && rates) {
            names.values
                .filter((name) => name?.trim())
                .forEach((name, index) => {
                    const value = rates.values[index];

                    if (name && value) {
                        this._rates[name] = parseFloat(value.replace(",", "."));
                    }
                });
        }
    }

    getBase() {
        return this._base;
    }

    getDate() {
        return this._date;
    }

    getCurrenciesNames() {
        return Object.keys(this._rates);
    }

    /**
     * @returns {object} - data to save in db
     * */
    getDataToStore() {
        const names = this.getCurrenciesNames();
        const rates = names.map(
            (item) =>
                new Stock({
                    name: item,
                    rate: this._rates[item].toFixed(2),
                }),
        );

        // const pln = {
        //     rates,
        //     date: this.getDate(),
        //     base: "PLN",
        // };
        //
        // const usd = {
        //     rates: [],
        //     date: this.getDate(),
        //     base: "USD",
        // };
        //
        // const usdPrice = rates.find(({ name }) => name === "USD")?.rate;
        //
        // if (usdPrice) {
        //     usd.rates = pln.rates
        //         .filter(({ name }) => name !== "USD")
        //         .map((item) => {
        //             const result = { ...item };
        //             result.rate = parseFloat(result.rate / usdPrice).toFixed(2);
        //             return result;
        //         });
        //
        //     usd.rates.push({
        //         name: "PLN",
        //         rate: parseFloat(1 / usdPrice).toFixed(2),
        //     });
        // }

        return {
            rates,
            date: this.getDate(),
            base: "PLN",
        };
    }

    /**
     * saves currencies names into db collection
     * */
    async saveNewRecords() {
        try {
            await new FindOrCreateRecords({
                findElements: this.getCurrenciesNames(),
                model: StockModel,
                match: "name",
                createSchema: {
                    name: "string",
                },
            }).exec();
        } catch (e) {
            throw e;
        }
    }
}

module.exports = StockParser;
