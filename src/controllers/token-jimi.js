const axios = require("axios");
const Md5 = require("md5");
const utf8 = require("utf8");
const { USER_ID, PASSWORD_MD5, APP_KEY, APP_SECRET } = process.env;
const { Token } = require("../db.ts");
const moment = require("moment");
const tokenValidated = await Token.findAll()[0];

async function authenticationToken() {
  // Busco el token en la base de datos
  // Verifico que sea menor que la hora y que sea menor que la hora de expiración menos diez minutos
  if (
    (tokenValidated.time <=
      new Date().toISOString().slice(0, 19).replace("T", " ") ||
      tokenValidated === undefined) &&
    (tokenValidated.time <=
      moment(tokenValidated.time)
        .add(1, "h")
        .add(50, "m")
        .format("YYYY-M-DD HH:mm:ss") ||
      tokenValidated === undefined)
  ) {
    return true;
    // Verifico si esta dentro del margen de 10 min antes de vencer el token para ver si puedo refrescarlo y no tener que crear otro
  } else if (
    tokenValidated.time <=
      new Date().toISOString().slice(0, 19).replace("T", " ") &&
    !tokenValidated.time <=
      moment(tokenValidated.time)
        .add(1, "h")
        .add(50, "m")
        .format("YYYY-M-DD HH:mm:ss")
  ) {
    refreshToken(tokenValidated);
  } else {
    //En ultima instancia creo uno nuevo
    getToken(tokenValidated);
  }
}

async function getToken(tokenValidated) {
  // objeto de parametros para el sing
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
  var urlencoded = new URLSearchParams(paramsSing).toString();
  urlencoded.append("sign", sign);
  // urlencoded.append("app_key", paramsSing.app_key);
  // urlencoded.append("expires_in", paramsSing.expires_in);
  // urlencoded.append("format", paramsSing.format);
  // urlencoded.append("v", paramsSing.v);
  // urlencoded.append("method", paramsSing.method);
  // urlencoded.append("user_pwd_md5", paramsSing.user_pwd_md5);
  // urlencoded.append("sign_method", paramsSing.sign_method);
  // urlencoded.append("user_id", paramsSing.user_id);
  // urlencoded.append("timestamp", paramsSing.timestamp);

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
      const updateToken = await tokenValidated.update({
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
  var urlencoded = new URLSearchParams(paramsSing).toString();
  urlencoded.append("sign", sign);
  // urlencoded.append("app_key", paramsSing.app_key);
  // urlencoded.append("expires_in", paramsSing.expires_in);
  // urlencoded.append("format", paramsSing.format);
  // urlencoded.append("v", paramsSing.v);
  // urlencoded.append("method", paramsSing.method);
  // urlencoded.append("user_pwd_md5", paramsSing.user_pwd_md5);
  // urlencoded.append("sign_method", paramsSing.sign_method);
  // urlencoded.append("user_id", paramsSing.user_id);
  // urlencoded.append("timestamp", paramsSing.timestamp);
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
      const updateToken = await tokenValidated.update({
        time: response.data.result.time,
        token: response.data.result.accessToken,
        refreshToken: response.data.result.refreshToken,
      });
    })
    .catch(function (error) {
      res.send(error.data);
    });
}

module.exports = { authenticationToken };
