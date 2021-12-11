const userExpress = require("express");
const userRouter = userExpress.Router();
const bcrypt = require("bcrypt");
const { User, LicensePlate } = require("../src/db.js");


userRouter.post("/modify", async (req, res) => {
   
    try {
      const { username, password } = req.body;


      const user = await User.findOne({where:{
          name:username,
      }})
  
      if (
        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          password
        )
      ) {
        throw new Error(
          "Password must have at least 8 chars 1 Uppercase, 1 lowercase,1 number and 1 special character"
        );
      }
  
      let salt = bcrypt.genSaltSync(10);
      let pass = bcrypt.hashSync(password, salt);
  
      await user.update({password:pass})
      
      await user.save()
  
      if (user.password === pa) {
        return res.status(200).send("User created successfully");
      }
  
  
      res.status(201).json(pass);
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
});

  
userRouter.delete("/delete", async function (req, res) {
  
    try{
        await User.update({active:false},{
            where: {
            name: req.body.user
            }
        })
        res.status(200).send({msg:'Usuario eliminado con exito'})
    }
    catch(err){
        res.status(500).send({err})
    }

});

module.exports = userRouter;