const {
    PROTOCOL,
    DOMAIN,
    PORT,
    ADMIN_EMAIL,
    CURRENCY_API_PATH,
    ADMIN_PASSWORD,
    MONGO_CONNECTION_LINK
} = process.env;

const mongoose = require("mongoose");
const defaultCategories = require("./defaults/categories");

const FetchData = require("./utils/FetchData");
const CurrencyParser = require("./utils/CurrencyParser");
const FindOrCreateRecords = require("./utils/FindOrCreateRecords");
const DataCollector = require("./utils/DataCollector");

module.exports = async () => {
    try {
        const categoriesNames = defaultCategories.map(({name}) => name);

        /**
         * init database connection
         * */
        await mongoose.connect(MONGO_CONNECTION_LINK, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const { User, Category, Currency, CurrencyRate } = mongoose.models;

        //@todo move admin init into this place
        /**
         * init admin user
         * */
        const adminUser = await User.findOne({email: ADMIN_EMAIL});

        if(!adminUser){
            const admin = User();

            admin.email = ADMIN_EMAIL;
            admin.password = ADMIN_PASSWORD;
            admin.role = "admin";

            await admin.save();
        }

        /**
         * initialize defaults - categories,
         * */
        await new FindOrCreateRecords({
            findElements: categoriesNames,
            model: Category,
            match: "name",
            createSchema: {
                name: "string"
            }
        }).exec();

        //@todo open connection with remote apis to collect data -------- optimize !!!
        const fetchedCurrencies = await new FetchData({ url: `${CURRENCY_API_PATH}/latest?base=USD` }).fetch();

        const parsedCurrencies = new CurrencyParser(fetchedCurrencies);

        //@todo init currencies

        await new FindOrCreateRecords({
            findElements: parsedCurrencies.getCurrenciesNames(),
            model: Currency,
            match: "name",
            createSchema: {
                name: "string"
            }
        }).exec();

        //@todo save daily rates
        new DataCollector({
            fetchController: new FetchData({ url: `${CURRENCY_API_PATH}/latest?base=USD` }),
            parser: CurrencyParser,
            // interval: 1000 * 60,
            store: CurrencyRate
        });

        // currency - https://exchangeratesapi.io/
        // crypto - https://bitbay.net/pl/api-publiczne
        // metals - https://metals-api.com/

    }catch (e) {
        throw new Error(e);
    }

    console.log("\x1b[36m%s\x1b[0m", `EXPRESS API listening on ${PROTOCOL}://${DOMAIN}:${PORT}`);
};