const axios = require("axios")
const Fs = require('fs')


module.exports = {
    download: function(url){
        let arrPromise = []

        url.map( (el) => axios({
            method: 'GET',
            url: el,
            responseType: 'stream'
          })
        )
    }
}