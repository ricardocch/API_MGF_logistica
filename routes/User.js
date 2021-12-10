const userExpress = require("express");
const userRouter = userExpress.Router();
const bcrypt = require("bcrypt");
const { User, LicensePlate } = require("../src/db.js");


userRouter.post("/create", async (req, res) => {
   
    try {
      const { name, email, admin, phone, password, cuit } = req.body;
  
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
  
      if (!/^[a-zA-Z0-9]+$/.test(name)) {
        throw new Error("Name must only have numbers and letters");
      }
  
      let [user, userCreated] = await User.findOrCreate({
        where: { name: name, cuit: cuit },
        defaults: {
          name: name,
          password: pass,
          email: email,
          admin: admin,
          phone: phone,
          cuit: cuit,
        },
      });
  
      if (userCreated) {
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
        await userModel.User.destroy({
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