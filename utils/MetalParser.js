const FindOrCreateRecords = require("../utils/FindOrCreateRecords");
const Metal = require("./Metal");
const MetalModel = require("../models/Metal");

class MetalParser {
    constructor({ rates, base, date }) {
        if (!rates) throw new Error("Data are not valid metal object");

        this._rates = {};
        this._base = base;
        this._date = date;

        this._namesToAvoid = ["USD"];

        this.convertInputRateNamesToRenamed(rates);
    }

    getBase() {
        return this._base;
    }

    getDate() {
        return this._date;
    }

    getMetalsNames() {
        return Object.keys(this._rates)
            .filter((item) => !this._namesToAvoid.includes(item))
            .map((item) => this.renameMetal(item));
    }

    convertInputRateNamesToRenamed(rates) {
        Object.keys(rates).forEach((item) => {
            this._rates[this.renameMetal(item)] = rates[item];
        });
    }

    renameMetal(name) {
        return {
            [name]: name,
            XAU: "XAU(Gold)",
            XAG: "XAG(Silver)",
            XPT: "XPT(Platinum)",
        }[name];
    }

    /**
     * @returns {object} - data to save in db
     * */
    getDataToStore() {
        const names = this.getMetalsNames();
        const rates = names.map((item) => {
            return new Metal({
                name: this.renameMetal(item),
                rate:
                    this.getBase() === "PLN"
                        ? this._rates[item].toFixed(2)
                        : (1 / this._rates[item]).toFixed(2),
            });
        });

        return {
            rates,
            date: this.getDate(),
            base: this.getBase(),
        };
    }

    /**
     * saves currencies names into db collection
     * */
    async saveNewRecords() {
        try {
            await new FindOrCreateRecords({
                findElements: this.getMetalsNames(),
                model: MetalModel,
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

module.exports = MetalParser;
