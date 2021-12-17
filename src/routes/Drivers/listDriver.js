const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const {Driver} = require('../../db.js')
 
router.get("/", async function (req, res) {
  
    try{
        let drivers = await Driver.findAll()        
       
       
        res.json(drivers)
        
    }
    catch(err){
        console.log(err);
        res.status(404).send(err)
    }

});

module.exports = router;