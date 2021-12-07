const md5 = require('md5')

interface Params {
  method: string;
}

const generateSign = () => {
  const params: Params = {
    method: 'jimi.oauth.token.get'
  }
}