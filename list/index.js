const express =require("express")
const CityModel = require("./Schema")
const {authenticate }= require("../auth/authTools")
const {authorize} = require("../middlewares/authorize")
const router = express.Router()
const bcrypt = require("bcrypt");
const passport = require("passport");

router.post("/", async (req, res) => {
    try {
    
        const newCity = new CityModel(req.body);
        await newCity.save();
        res.send("New city added to the list");
      
    } catch (error) {
   
      res.send(error.errors);
    }
  });
router.get("/", authorize, async(req, res, next)=>{
    try {
        const cities = await CityModel.find(req.query)
        res.send({
            data: cities,
            total: cities.length
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
})


router.delete("/:id", async(req, res, next)=>{
    try {
      
        const user = await LoginModel.findByCredentials(email, password)
        console.log(user)
        const token  = await authenticate(user)
        res.cookie("accessToken", token, {
            path: "/",
            httpOnly: true,
            sameSite: true,
          })
        res.send(token)
    } catch (error) {
        
    }
    
})

module.exports = router;