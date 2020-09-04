const express = require("express");
const server = express()
const mongoose =require("mongoose")
const listEndpoints = require("express-list-endpoints")

console.log(listEndpoints(server))
mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(process.env.PORT|| 3002, () => {
        console.log(`Server is running on ${process.env.PORT}`)
    })
  )
  .catch((err) => console.log(err))
