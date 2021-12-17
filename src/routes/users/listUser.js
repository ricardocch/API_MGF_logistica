const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const {User , LicensePlate} = require('../../db.js')
 
router.post("/", async function (req, res) {
  
    try{
        let userAdminInstance = await User.findOne({
            where: {
            user: req.body.user
            }
        })
        // se declara inicializa en caso de que no haya usuarios no rompa el servidor
        let userInstance = []

        if(userAdminInstance === null){
            return res.status(500).send({err:'usuario no exste'})
        }//si es sa vera todos los usuarios que no sean el
        else if(userAdminInstance.admin === 'sa'){
             userInstance = await User.findAll({
                where:{
                    admin: {
                        [Op.not]: 'sa'
                    }
                }
            })
            

        }//si es admin vera solo usuarios
        else if(userAdminInstance.admin === 'admin'){
            userInstance = await User.findAll({
                where:{
                    admin: 'usuario'
                }
            })
            
        }
        else{
          return  res.status(400).send({msg:'Usuario no es admin'})
        }
        //creamos el json para mandar
        let userJSON = userInstance.map((el) =>{
            return{
                user:el.user,
                name:el.name,
                email:el.email,
                type:el.admin,
                phone:el.phone,
                cuit:el.cuit
            }
        })

       return res.send(userJSON)
        
    }
    catch(err){
        console.log(err);
        res.status(500).send({err})
    }

});

module.exports = router;