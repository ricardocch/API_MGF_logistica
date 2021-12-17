const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const {Post,User,Driver,LicensePlate} = require('../../db.js')
 
router.get("/", async function (req, res) {
  
    try{
       let posts = await Post.findAll({include:[User,Driver,LicensePlate]})        
       return res.json(posts)
        
    }
    catch(err){
        console.log(err);
        res.status(500).send({err})
    }

});

module.exports = router;