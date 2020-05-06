const mongoose = require("mongoose");
const { Schema } = mongoose;

const CurrencyRateSchema = new Schema(
    {
        rates: { type: Array, required: true },
        date: { type: Date, required: true },
        base: { type: String, required: true },
    },
    {
        timestamps: { createdAt: "createdAt", index: true }
    }
);

module.exports = mongoose.model("CurrencyRate", CurrencyRateSchema);