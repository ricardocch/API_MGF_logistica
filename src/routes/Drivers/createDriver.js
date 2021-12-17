const { Router } = require("express");
const {sendMail} = require("../../controllers/email.js")
const {Driver} = require('../../db.js')
var bcrypt = require('bcryptjs');
const router = Router();

router.post('/',async (req,res)=>{    
   
    const {
        name,
        dni
    }= req.body

    try{ 
        const driver = await Driver.create({
            name:name,
            dni:dni
        }) 

        res.status(201).json({msg:"Successfully Created",driver:driver})
        }catch(err){       
        console.log(err)
        res.status(404).send(err)
    }
})

module.exports=router