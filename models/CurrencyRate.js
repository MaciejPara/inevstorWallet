const mongoose = require("mongoose");
const { Schema } = mongoose;

const CurrencyRateSchema = new Schema(
    {
        rates: { type: Array, required: true },
        date: { type: Date, required: true },
        base: { type: String, required: true },
    },
    {
        timestamps: { createdAt: "createdAt" }
    }
);

CurrencyRateSchema.index({createdAt: 1});

module.exports = mongoose.model("CurrencyRate", CurrencyRateSchema);