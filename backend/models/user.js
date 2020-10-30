const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        default: null,
    },
    isVerified: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;