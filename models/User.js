const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, default: "user" },
        confirmed: { type: Boolean, default: false },
        settings: { type: Object, default: { base: "PLN" } }, //@todo test
        favourites: { type: Array, default: [] },
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
    }
);

UserSchema.index({createdAt: 1});

UserSchema.pre("save", function(next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    const _this = this;
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        if(isMatch) cb(null, _this);
        else cb(null, false);
    });
};

module.exports = mongoose.model("User", UserSchema);