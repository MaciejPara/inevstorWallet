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
            if(this._interval) this.setInterval();
            else await this.initCollector();
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