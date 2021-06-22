const fetch = require("node-fetch");

class FetchData {
    constructor({ url }) {
        this._url = url;

        this._fetchTypes = ["json", "text"];
    }

    async fetch(fetchType = "json") {
        try {
            const type = this._fetchTypes.find((item) => item === fetchType);
            let res = await fetch(this._url);

            if (type) {
                res = await res[type]();
            }

            return res;
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = FetchData;
