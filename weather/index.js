const express =require("express")
const LoginModel = require("./Schema")
const authenticate = require("../auth/authTools")
const router = express.Router()
const bcrypt = require("bcrypt");
const passport = require("passport");

router.post("/register", async (req, res) => {
    try {
      const checkEmail = await LoginModel.find({ email: req.body.email });
      console.log(checkEmail);
      if (checkEmail.length !== 0) {
        res.status(409).send("user with same email exists");
      } else {
        const plainPassword = req.body.password;
        req.body.password = await bcrypt.hash(plainPassword, 8);
        console.log(req.body);
        const newUser = new LoginModel(req.body);
        await newUser.save();
        res.send("registered Successfully");
      }
    } catch (error) {
      //next(error);
      res.send(error.errors);
    }
  });

router.post("/login", async(req, res, next)=>{
    try {
        const {email, password}= req.body
        const user = await LoginModel.findByCredentials(email, password)
        
        const token  =await authenticate(user)
        res.send(token)
    } catch (error) {
        
    }
    
})


module.exports = router;