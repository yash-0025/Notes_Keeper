const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        trim:true,
    },
    lastName: {
        type: String,
        required:true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        length: 8,
        trim: true,
    },
    createdAt: {
        type: Date,
        default:Date.now,
    },
});

module.exports = mongoose.model('User', userSchema)