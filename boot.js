const {
    PROTOCOL,
    DOMAIN,
    PORT,
    ADMIN_EMAIL,
    CURRENCY_API_PATH,
    ADMIN_PASSWORD,
    MONGO_CONNECTION_LINK,
    DATA_COLLECTOR_INTERVAL,
    METALS_API_PATH,
    METALS_API_KEY,
} = process.env;

const mongoose = require("mongoose");
const defaultCategories = require("./defaults/categories");
const cryptoCurrencies = require("cryptocurrencies");

const FetchData = require("./utils/FetchData");
const CurrencyParser = require("./utils/CurrencyParser");
const MetalsParser = require("./utils/MetalParser");
const FindOrCreateRecords = require("./utils/FindOrCreateRecords");
const DataCollector = require("./utils/DataCollector");
const ScheduleJob = require("./utils/ScheduleJob");


module.exports = async () => {
    try {
        const categoriesNames = defaultCategories.map(({name}) => name);

        /**
         * init database connection
         *
         * development - localhost
         * production - cloud mongodb
         * */
        await mongoose.connect(MONGO_CONNECTION_LINK, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const { User, Category, CurrencyRate, Crypto, MetalRate } = mongoose.models;

        /**
         * init admin user
         * */
        const adminUser = await User.findOne({email: ADMIN_EMAIL});

        if(!adminUser){
            const admin = User();

            admin.email = ADMIN_EMAIL;
            admin.password = ADMIN_PASSWORD;
            admin.role = "admin";
            admin.confirmed = true;

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

        /**
         * initialize defaults - crypto currencies,
         * */
        await new FindOrCreateRecords({
            findElements: Object.keys(cryptoCurrencies),
            model: Crypto,
            match: "name",
            createSchema: {
                name: "string"
            }
        }).exec();

        // @todo prepare user preferences and settings about data collecting

        new ScheduleJob({
            date: "* * 6 * * *", //@todo prepare optional setting
            job: () => {
                return new DataCollector({
                    fetchController: new FetchData({ url: `${CURRENCY_API_PATH}/latest?base=PLN` }),
                    parser: CurrencyParser,
                    store: CurrencyRate
                });
            }
        });

        new ScheduleJob({
            date: "* * 6 * * *", //@todo prepare optional setting
            job: () => {
                return new DataCollector({
                    fetchController: new FetchData({url: `${METALS_API_PATH}/api/latest?access_key=${METALS_API_KEY}&base=PLN&symbols=XAU,XAG`}),
                    parser: MetalsParser,
                    store: MetalRate
                });
            }
        });

        // const res = await new FetchData({ url: `https://metals-api.com/api/latest?access_key=${METALS_API_KEY}` }).fetch();

        // console.log(res);

        // new DataCollector({
        //     fetchController: new FetchData({ url: `https://metals-api.com/api/latest?access_key=${METALS_API_KEY}` }),
        //     parser: MetalsParser,
        //     store: CurrencyRate
        // });

        //@todo prepare node-schedule for everyday data collection

        //@todo save metals rates

        //@todo prepare website parser for real time rates - not MVP

        // currency - https://exchangeratesapi.io/
        // crypto - https://bitbay.net/pl/api-publiczne
        // metals - https://metals-api.com/

    }catch (e) {
        throw new Error(e);
    }

    console.log("\x1b[36m%s\x1b[0m", `EXPRESS API listening on ${PROTOCOL}://${DOMAIN}:${PORT}`);
};