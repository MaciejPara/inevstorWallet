const mongoose = require("mongoose");
const { Schema } = mongoose;

const CryptoSchema = new Schema(
    {
        name: { type: String, required: true },
    },
    {
        timestamps: { createdAt: "createdAt" }
    }
);

CryptoSchema.index({createdAt: 1});

module.exports = mongoose.model("Crypto", CryptoSchema);