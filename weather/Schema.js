const mongoose = require("mongoose")
const { Schema } = require("mongoose")
const v = require("validator")
const bcrypt = require("bcrypt");

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
loginSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
  
    delete userObject.password
    delete userObject.__v
  
    return userObject
  }
loginSchema.statics.findByCredentials = async (email, password)=>{
    const user = await LoginModel.findOne({email})
    console.log(user)
    const isMatch = await bcrypt.compare(password, user.password)
    
    if (!isMatch) {
        const err = new Error("Unable to login")
        err.httpStatusCode = 401
        throw err
    }

  return user
}

const LoginModel = mongoose.model("login", loginSchema);
module.exports = LoginModel;