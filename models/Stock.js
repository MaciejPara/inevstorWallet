const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
    {
        name: { type: String, required: true },
    },
    {
        timestamps: { createdAt: "createdAt" },
    },
);

schema.index({ createdAt: 1 });

module.exports = mongoose.model("Stock", schema);
