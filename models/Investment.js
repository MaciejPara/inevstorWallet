const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
    {
        userId: { type: String, required: true },
        what: { type: String, required: true },
        count: { type: Number, required: true },
        from: { type: String, required: true },
        price: { type: Number, required: true },
    },
    {
        timestamps: { createdAt: "createdAt" },
    },
);

schema.index({ createdAt: 1 });

module.exports = mongoose.model("Investment", schema);
