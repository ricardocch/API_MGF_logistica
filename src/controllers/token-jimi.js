const axios = require("axios");
const { Router } = require("express");
const router = Router();
const Md5 = require("md5");
const utf8 = require("utf8");
const { USER_ID, PASSWORD_MD5, APP_KEY, APP_SECRET } = process.env;
const { Token } = require("../db");
const moment = require("moment");
let tokenValidated = "";

router.use(async function (req, res, next) {
  // Busco el token en la base de datos
  tokenValidated = await Token.findByPk(1);
  let timeDBExpiration = moment(tokenValidated.time)
    .add(2, "h")
    .format("YYYY-M-DD HH:mm:ss");
  let newTime = new Date().toISOString().slice(0, 19).replace("T", " ");
  let timeRefresh = moment(tokenValidated.time)
    .add(1, "h")
    .add(50, "m")
    .format("YYYY-M-DD HH:mm:ss");
  console.log("primera funcion");
  // Verifico que sea menor que la hora y que sea menor que la hora de expiración menos diez minutos

  if (tokenValidated === null) {
    console.log("GET TOKEN por undefined");
    getToken();
  } else if (
    moment(newTime).isBefore(timeDBExpiration) &&
    moment(newTime).isBefore(timeRefresh)
  ) {
    console.log("valido que el token de la api ya existe");
    return next();
    // Verifico si esta dentro del margen de 10 min antes de vencer el token para ver si puedo refrescarlo y no tener que crear otro
  } else if (
    moment(newTime).isBefore(timeDBExpiration) &&
    moment(newTime).isAfter(timeRefresh)
  ) {
    refreshToken(tokenValidated);
  } else {
    console.log("GET TOKEN por ultimo else");

    //En ultima instancia creo uno nuevo
    getToken(tokenValidated);
  }
  next();
});

async function getToken(tokenValidated) {
  // objeto de parametros para el sing
  console.log("entró en getToken");

  let paramsSing = {
    app_key: APP_KEY,
    expires_in: 7200,
    timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
    format: "json",
    method: "jimi.oauth.token.get",
    user_id: USER_ID,
    sign_method: "md5",
    user_pwd_md5: PASSWORD_MD5,
    v: "1.0",
  };

  //str de parametros ordenados alfabeticamente y unidos
  let temp = utf8.encode(
    Object.entries(paramsSing).sort().join().replace(/,/g, "")
  );
  //genero el sign concatenando los datos, "hasheado" con md5 y modificando todo eso a mayusculas
  const sign = Md5(APP_SECRET + temp + APP_SECRET).toUpperCase();

  // creo la query de parametros de la peticion
  var urlencoded = new URLSearchParams();
  urlencoded.append("sign", sign);
  urlencoded.append("app_key", paramsSing.app_key);
  urlencoded.append("expires_in", paramsSing.expires_in);
  urlencoded.append("format", paramsSing.format);
  urlencoded.append("v", paramsSing.v);
  urlencoded.append("method", paramsSing.method);
  urlencoded.append("user_pwd_md5", paramsSing.user_pwd_md5);
  urlencoded.append("sign_method", paramsSing.sign_method);
  urlencoded.append("user_id", paramsSing.user_id);
  urlencoded.append("timestamp", paramsSing.timestamp);

  // objeto que define las propiedades de la peticion
  var requestOptions = {
    method: "POST",
    Accept: "application/json",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Context-Type": "application/json charset=utf-8",
      "User-Agent": "axios/0.24.0",
    },
    params: urlencoded,
  };
  console.log("esta pór hacer la peticion");

  // hago la peticion y devuelvo la info a postman
  // axios("http://open.10000track.com/route/rest", requestOptions)
  //   .then((response) => {
  //     console.log("data de la peticion", response.data);
  //     const updateToken = Token.create({
  //       time: response.data.result.time,
  //       token: response.data.result.accessToken,
  //       refreshToken: response.data.result.refreshToken,
  //     });
  //   })
  //   .catch(function (error) {
  //     console.log(error.data);
  //   });
  axios("http://open.10000track.com/route/rest", requestOptions)
    .then((response) => {
      console.log(response.data);
      const newToken = tokenValidated.update({
        time: response.data.result.time,
        token: response.data.result.accessToken,
        refreshToken: response.data.result.refreshToken,
      });
    })
    .catch(function (error) {
      res.send(error.data);
    });
}

async function refreshToken(tokenValidated) {
  let paramsSing = {
    app_key: APP_KEY,
    timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
    format: "json",
    method: "jimi.oauth.token.get",
    sign_method: "md5",
    v: "1.0",
    access_token: tokenValidated.token,
    refresh_token: tokenValidated.refreshToken,
    expires_in: 7200,
  };

  //str de parametros ordenados alfabeticamente y unidos
  let temp = utf8.encode(
    Object.entries(paramsSing).sort().join().replace(/,/g, "")
  );
  //genero el sign concatenando los datos, "hasheado" con md5 y modificando todo eso a mayusculas
  let app_secret = APP_SECRET;
  const sign = Md5(app_secret + temp + app_secret).toUpperCase();

  // creo la query de parametros de la peticion
  var urlencoded = new URLSearchParams();
  urlencoded.append("sign", sign);
  urlencoded.append("app_key", paramsSing.app_key);
  urlencoded.append("expires_in", paramsSing.expires_in);
  urlencoded.append("format", paramsSing.format);
  urlencoded.append("v", paramsSing.v);
  urlencoded.append("method", paramsSing.method);
  urlencoded.append("user_pwd_md5", paramsSing.user_pwd_md5);
  urlencoded.append("sign_method", paramsSing.sign_method);
  urlencoded.append("user_id", paramsSing.user_id);
  urlencoded.append("timestamp", paramsSing.timestamp);
  // objeto que define las propiedades de la peticion
  var requestOptions = {
    method: "POST",
    Accept: "application/json",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Context-Type": "application/json charset=utf-8",
      "User-Agent": "axios/0.24.0",
    },
    params: urlencoded,
  };

  //hago la peticion y devuelvo la info a postman
  axios("http://open.10000track.com/route/rest", requestOptions)
    .then((response) => {
      console.log(response.data);
      const refreshToken = tokenValidated.update({
        time: response.data.result.time,
        token: response.data.result.accessToken,
        refreshToken: response.data.result.refreshToken,
      });
    })
    .catch((error) => {
      console.log(error.data);
    });
}

module.exports = router;
