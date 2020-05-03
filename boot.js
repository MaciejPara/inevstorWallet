const { PROTOCOL, DOMAIN, PORT, ADMIN_EMAIL } = process.env;
const mongoose = require("mongoose");

const defaultCategories = require("./defaults/categories");

//@todo move to env & secure variables by adding env into heroku build config
const ADMIN_PASSWORD = "11111111";

module.exports = async () => {
    try {
        const categoriesNames = defaultCategories.map(({name}) => name);

        /**
         * init database connection // @todo prepare production env with mongo cloud
         * */
        await mongoose.connect("mongodb://localhost/investorWallet", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const { User, Category } = mongoose.models;

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

        //@todo ... ////////////////// optimize !!!
        /**
         * initialize defaults - categories,
         * */
        const fetchedCategories = await Category.find({ name: { $in: categoriesNames } });
        const categoriesToCreate = categoriesNames.filter(name => fetchedCategories.findIndex(({name: n}) => n === name) === -1);

        if(categoriesToCreate.length > 0) await Category.create(categoriesToCreate.map(item => ({ name: item })));


        //@todo open connection with remote apis to collect data

        // currency - https://exchangeratesapi.io/
        // crypto - https://bitbay.net/pl/api-publiczne
        // metals - https://metals-api.com/

    }catch (e) {
        throw new Error(e);
    }

    console.log("\x1b[36m%s\x1b[0m", `EXPRESS API listening on ${PROTOCOL}://${DOMAIN}:${PORT}`);
};