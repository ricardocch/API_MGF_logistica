const userExpress = require("express");
const userRouter = userExpress.Router();
const userModel = require('../src/db.ts');
const encryptPassword = require('../src/controllers/encrypt.ts');



userRouter.post("/create",function(req,res){
    encryptPassword.cryptPassword("holamundo",function(err,hash){
        console.log(hash);
    })
})
//este endPoint es de prueba
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