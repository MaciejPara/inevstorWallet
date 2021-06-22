class FindOrCreateRecords{
    constructor({ match, findElements, model, createSchema }){
        this._model = model;
        this._match = match;
        this._elements = findElements;
        this._createSchema = createSchema;
    }

    objectToCreate(item){ // @todo prepare for createSchema
        return { [this._match]: item };
    }

    getAll(){
        return this._records;
    }

    setAllRecords(records){
        this._records = records;
    }

    async exec(){
        try {
            const found = await this.find();
            const filtered = this._elements.filter(item => found.findIndex(({[this._match]: n}) => n === item) === -1);
            let createdRecords = [];

            if(filtered && filtered.length > 0) {
                createdRecords = await this.create(filtered.map(item => this.objectToCreate(item)));
            }

            this.setAllRecords([...found, ...createdRecords]);

            return this;
        }catch (e) {
            throw new Error(e);
        }
    }

    async find(){
        try {
            return await this._model.find({ [this._match]: { $in: this._elements } });
        }catch (e) {
            throw new Error(e);
        }
    }

    async create(collection){
        try {
            return await this._model.create(collection);
        }catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = FindOrCreateRecords;