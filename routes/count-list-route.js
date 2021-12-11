const { default: axios } = require("axios");
const routerAccountList = Router();
const Md5 = require("md5");
const utf8 = require("utf8");
const { USER_ID, PASSWORD_MD5, APP_KEY, APP_SECRET } = process.env;

routerAccountList.post("/account-list", function (req, res) {
  // objeto de parametros para el sing
  let paramsSing = {
    app_key: "8FB345B8693CCD0071EC1A2E4EB83F57",
    timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
    format: "json",
    method: "jimi.oauth.token.get",
    v: "1.0",
    sign_method: "md5",
    access_token: "",
    target: "",
  };

  //str de parametros ordenados alfabeticamente y unidos
  let temp = utf8.encode(
    Object.entries(paramsSing).sort().join().replace(/,/g, "")
  );
  //genero el sign concatenando los datos, "hasheado" con md5 y modificando todo eso a mayusculas
  let app_secret = "a11c15c35f0d43f3ae423748f3568451";
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
      res.send(response.data);
    })
    .catch(function (error) {
      res.send(error.data);
    });
});

module.exports = {
  routerAccountList,
};
