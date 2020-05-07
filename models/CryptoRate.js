const mongoose = require("mongoose");
const { Schema } = mongoose;

const CryptoRateSchema = new Schema(
    {
        rates: { type: Array, required: true },
        date: { type: Date, required: true },
        base: { type: String, required: true },
    },
    {
        timestamps: { createdAt: "createdAt" }
    }
);

CryptoRateSchema.index({createdAt: 1});

module.exports = mongoose.model("CryptoRate", CryptoRateSchema);