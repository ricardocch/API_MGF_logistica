const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const createToken = require('jsonwebtoken');
const config = require('./configToken/config');
const routes = require('./routes/index.ts');
const server = express();
const auth = express();;
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

server.post('/login', (req, res) => {
  if(req.body.usuario === "asdf" && req.body.contrasena === "holamundo") {
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
      res.json({ mensaje: "Usuario o contraseña incorrectos"})
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