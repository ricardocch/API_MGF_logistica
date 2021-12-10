
const md5 = require('md5')
const moment = require("moment");


let prueba = () => moment().format("yyyy-MM-d HH:mm:ss.");

const generateSign = () => {
  const params = {
    method: 'jimi.oauth.token.get'
  }
}
