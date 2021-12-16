const { Router } = require("express");
const {sendMail} = require("../../controllers/email.js")
const {LicensePlate} = require('../../db.js')
var bcrypt = require('bcryptjs');
const router = Router();

router.post('/',async (req,res)=>{    
   
    const {
        name,       
    }= req.body

    try{ 
        const license = await LicensePlate.create({
            name:name,         
        }) 

        res.status(201).json({msg:"Successfully Created",license:license})
        }catch(err){       
        console.log(err)
        res.status(404).send(err)
    }
})

module.exports=router