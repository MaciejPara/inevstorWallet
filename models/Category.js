const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema(
    {
        name: { type: String, required: true },
    },
    {
        timestamps: { createdAt: "createdAt" }
    }
);

CategorySchema.index({createdAt: 1});

module.exports = mongoose.model("Category", CategorySchema);