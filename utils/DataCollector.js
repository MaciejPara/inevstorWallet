const Utils = require("./Utils");

class DataCollector{
    constructor({ fetchController, parser, interval, store }){
        this._fetchController = fetchController;
        this._parser = parser;
        this._interval = interval;
        this._store = store;

        this.init();
    }

    async init(){
        try {
            const res = await this._store.findOne({}, "createdAt").sort({ createdAt: -1 });
            const { createdAt: date } = res || {};
            const validDate = date && new Date(date);

            if(!validDate || !Utils.isDateSameAsToday(validDate)) await this.initCollector();
            if(this._interval) this.setInterval();
        }catch (e) {
            throw e;
        }
    }

    setInterval(){
        setInterval(async () =>{
            await this.initCollector();
        }, this._interval);
    }

    async fetch(){
        try {
            return this._fetchController.fetch();
        }catch (e) {
            throw e;
        }
    }

    async initCollector(){
        try {
            const result = await this.fetch();
            const parsedData = new this._parser(result);
            const dataToStore = parsedData.getDataToStore();

            await parsedData.saveNewRecords();
            await this.storeData(dataToStore);
        }catch (e) {
            throw e;
        }
    }

    async storeData(data){
        try {
            await this._store.create(data);
        }catch (e) {
            throw e;
        }
    }
}

module.exports = DataCollector;