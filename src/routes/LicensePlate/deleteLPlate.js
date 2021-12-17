const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const {LicensePlate} = require('../../db.js')
 
router.put("/", async function (req, res) {
  
    try{
        await LicensePlate.update({active:false},{
            where: {
            name: req.body.license
            }
        })
        res.status(200).send({msg:'Successfully deleted'})
    }
    catch(err){
        res.status(500).send({err})
    }

});

module.exports = router;