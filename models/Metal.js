const mongoose = require("mongoose");
const { Schema } = mongoose;

const MetalSchema = new Schema(
    {
        name: { type: String, required: true },
    },
    {
        timestamps: { createdAt: "createdAt" }
    }
);

MetalSchema.index({createdAt: 1});

module.exports = mongoose.model("Metal", MetalSchema);