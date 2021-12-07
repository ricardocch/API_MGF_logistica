
const md5 = require('md5')
const moment = require("moment");

interface Params {
  method: string;
}

let prueba = () => moment().format("yyyy-MM-d HH:mm:ss.");

const generateSign = () => {
  const params: Params = {
    method: 'jimi.oauth.token.get'
  }
}
