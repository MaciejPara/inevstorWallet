const fetch = require("node-fetch");

class FetchData{
    constructor({url}){
        this._url = url;
    }

    async fetch(){
        try {
            return await fetch(this._url).then(res => res.json());
        }catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = FetchData;