const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listSchema = new Schema({
    Message: {
        type: String,
        default: null,
    },
    user: {
        type: String,
        default: null,
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
});

const listModel = mongoose.model("list", listSchema);
module.exports = listModel;