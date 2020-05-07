const mongoose = require("mongoose");
const { Schema } = mongoose;

const MetalRateSchema = new Schema(
    {
        rates: { type: Array, required: true },
        date: { type: Date, required: true },
        base: { type: String, required: true },
    },
    {
        timestamps: { createdAt: "createdAt" }
    }
);

MetalRateSchema.index({createdAt: 1});

module.exports = mongoose.model("MetalRate", MetalRateSchema);