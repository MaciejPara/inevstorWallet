const fetch = require("node-fetch");

class FetchData{
    constructor({url}){
        this._url = url;

        return this.fetch();
    }

    async fetch(){
        try {
            const response = await fetch(this._url);

            return response.json();
        }catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = FetchData;