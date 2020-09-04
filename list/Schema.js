const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const citySchema = new Schema({
    name: {
        type: String,
        required: true,
      },
   
},{timestamps: true})

const CityModel = mongoose.model("cities", citySchema);
module.exports = CityModel;