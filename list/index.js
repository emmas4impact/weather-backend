const express =require("express")
const CityModel = require("./Schema")

const {authorize} = require("../middlewares/authorize")
const router = express.Router()


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


router.delete("/:id", authorize, async(req, res, next)=>{
    try {
      
        const city = await CityModel.findByIdAndDelete(req.params.id)
        if(!city)
            res.send(`This ${city} is wrong, please enter right Id`)
        res.send(`city with id ${city} Deleted successfully`)
    } catch (error) {
        next(error)
    }
    
})

module.exports = router;