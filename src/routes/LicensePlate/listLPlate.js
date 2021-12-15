const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const {LicensePlate} = require('../../db.js')
 
router.get("/", async(req, res) =>{
  
    try{
        let Licenses = await LicensePlate.findAll()        
        return res.json(Licenses)
        
    }
    catch(err){
        console.log(err);
        res.status(500).send({err})
    }

});

module.exports = router;