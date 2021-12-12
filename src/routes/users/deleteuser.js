const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const {User , LicensePlate} = require('../../db.js')
 
router.delete("/", async function (req, res) {
  console.log(User);
    try{
        await User.update({active:false},{
            where: {
            user: req.body.user
            }
        })
        res.status(200).send({msg:'Usuario eliminado con exito'})
    }
    catch(err){
        res.status(500).send({err})
    }

});

module.exports = router;