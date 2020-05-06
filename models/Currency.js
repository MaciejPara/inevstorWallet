const mongoose = require("mongoose");
const { Schema } = mongoose;

const CurrencySchema = new Schema(
    {
        name: { type: String, required: true },
    },
    {
        timestamps: { createdAt: "createdAt", index: true }
    }
);

module.exports = mongoose.model("Currency", CurrencySchema);