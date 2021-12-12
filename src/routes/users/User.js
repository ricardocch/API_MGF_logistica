const { Router } = require("express");
const axios = require("axios");
const {User , LicensePlate} = require('../../db.js')
var bcrypt = require('bcrypt');
const router = Router();

router.post('/',async (req,res)=>{    
    console.log(User);
    const {
        user,  
        name,         
        email,
        admin,
        phone,
        password,
        cuit        
    }= req.body

    try{ 

        
        if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)){
            throw new Error ('Password must have at least 8 chars 1 Uppercase, 1 lowercase,1 number and 1 special character')
        } 
        
    
        let salt = bcrypt.genSaltSync(10)
        let pass = bcrypt.hashSync(password,salt)   
                

        if(!/^[a-zA-Z0-9]+$/.test(user)){
            throw new Error('user must only have numbers and letters')
        }
              
        let [instanceUser,userCreated]= await User.findOrCreate({where:{user:user,cuit:cuit},
            defaults:{            
            user:user, 
            name:name,
            password:pass,
            email: email,
            admin:admin,
            phone:phone,
            cuit:cuit
            }})         

         if(userCreated){
           return  res.status(200).send('User created successfully')
        }
       
    
        res.status(201).json(pass)  
        }catch(err){       
        console.log(err)
        res.status(404).send(err)
    }
})

module.exports=router