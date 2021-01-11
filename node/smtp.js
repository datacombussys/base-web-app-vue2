const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'mail.datacombusinesssystems.com',
  secure: 'true', //Use TLS
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  },
  port: '465',
  auth: {
    user: 'support@datacombusinesssystems.com',
    pass: '0313Maninchrist'
  },

  //Google OAuth
  // auth: {
  // type: 'OAuth2', //Authentication type
  // user: 'your_email@service.com', //For example, xyz@gmail.com
  // clientId: 'Your_ClientID',
  // clientSecret: 'Client_Secret',
  // refreshToken: 'Refresh_Token'
  //      }
  });

// verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});



  module.exports = transporter;
