require("dotenv").config();

module.exports = {
    sendMail: function(to,subject,text){
        const nodemailer = require('nodemailer');

        let configMail = {
          host: "smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
          }
        }
        let transport = nodemailer.createTransport(configMail)
      
        const message = {
          from: 'HenryBack62021@gmail.com', 
          to,   
          subject, 
          text 
      };
      return new Promise((resolve, reject) => {
        transport.sendMail(message, function(err, info) {
            if (err) {
                reject({err})
            } else {
                resolve( {...info,
                msg:'correo enviado con Exito'
                });
            }
        });
      })
     
    }
}