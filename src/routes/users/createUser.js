const { Router } = require("express");
const {sendMail} = require("../../controllers/email.js")
const {User , LicensePlate} = require('../../db.js')
var bcrypt = require('bcryptjs');
const router = Router();

router.post('/',async (req,res)=>{    
   
    const {
        user,         
        email,
        admin,       
        password,      
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
              
        let [instanceUser,userCreated]= await User.findOrCreate({where:{user:user},
            defaults:{            
            user:user,            
            password:pass,
            email: email,
            admin:admin,            
            }})         

         if(userCreated){

            try{
                // envio mail confirmacion
                let respMail = await sendMail(instanceUser.email,'Usuario creado','Su usuario en MGF Logistica se ha creado con éxito')
                return res.status(200).send({msg:'User created successfully',
                    email:respMail
                })
            }
            catch{
               return res.status(404).send({err:'Usuario Creado, Fallo en  envio email'})
            }
            
        }
       
    
        res.status(201).json(pass)  
        }catch(err){       
        console.log(err)
        res.status(404).send(err)
    }
})

module.exports=router