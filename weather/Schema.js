const mongoose = require("mongoose")
const { Schema } = require("mongoose")
const v = require("validator")
const loginSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
    lastName: {
        type: String,
        required: true,
      },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: {
          validator: async (value) => {
            if (!v.isEmail(value)) {
              throw new Error("Email is invalid")
            }
          },
        },
      },
      password: {
        type: String,
        minlength: 7,
      },
})

loginSchema.statics.findByCreadentials = async (username, password)=>{
    const user = await loginSchema.f
}

const LoginModel = mongoose.model("login", loginSchema);
module.exports = LoginModel;