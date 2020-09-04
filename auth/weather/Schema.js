const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const loginSchema = new Schema({
    name: String,
    lastName: String,
    username: String
})

const LoginModel = mongoose.model("login", loginSchema);
module.exports = LoginModel;