const { Router } = require("express");
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {User , LicensePlate} = require('../src/db')
/* const create = require('./user') */
const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/types", function (req, res) {});
router.post('/create',async (req,res)=>{  
    
    try{ 
        /* 
        const name:string = req.body.name;
        const password:string = req.body.password;
        const email:string = req.body.email;
        const admin:boolean = req.body.admin;
        const phone:number= req.body.phone;                
       
       */

        console.log(req.body.name, req.body.password, req.body.email) 

        let [user,userCreated]= await User.findOrCreate({where:{name:req.body.name},
            defaults:{            
             name:req.body.name,
             password:req.body.password,
             email:req.body.email,
             admin:req.body.admin,
             phone:req.body.phone,
             cuit:req.body.cuit
            }})

      
      
               

         if(userCreated){
            res.status(200).send('User created successfully')
        }
        else{ 
        res.status(201).send('User already exist')    }
    }catch(err){       
        console.log(err)
        res.status(404).send(err)
    }
})
module.exports = router;
