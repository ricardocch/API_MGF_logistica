const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
var bcrypt = require("bcrypt");
const createToken = require('jsonwebtoken');
const config = require('./configToken/config');
const indexUserModel = require('./src/db.js');
const server = express();
const routes = require("./routes/index.js");

// server.use(express.urlencoded({ extended: true }));
// server.use('/', routes)

const auth = express();
server.set('llave', config.llave);
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

server.post('/login', async (req, res) => {
 
    let instanceUser = await indexUserModel.User.findOne({
      where:{name:req.body.usuario}
    })

    if(instanceUser === null){
      res.send({msg:'Usuario no encontrado'})
    }  
    else{
        if(bcrypt.compareSync(req.body.contrasena, instanceUser.password)) {
          const payload = {
          check:  true
          };
          const token = createToken.sign(payload, server.get('llave'), {
          expiresIn: 1440
          });
          res.json({
          mensaje: 'Autenticación correcta',
          token: token
          });
        } else {
            res.json({ msg: "Contraseña incorrectos"})
        }

    }


})

auth.use(function(req, res, next) {
  const token = req.headers['access-token'];

  if (token) {
    createToken.verify(token, server.get('llave'), (err, decoded) => {      
      if (err) {
        return res.json({ mensaje: 'Token inválida' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    res.send({ 
        mensaje: 'No se obtuvo token.' 
    });
  }
})
server.use('/',auth ,routes);
module.exports = server;  