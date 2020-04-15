const { PROTOCOL, DOMAIN, PORT } = process.env;
const mongoose = require("mongoose");

module.exports = async () => {

    await mongoose.connect("mongodb://localhost/investorWallet", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log("\x1b[36m%s\x1b[0m", `EXPRESS API listening on ${PROTOCOL}://${DOMAIN}:${PORT}`);
};