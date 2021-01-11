var express = require('express');
var router = express.Router();
var path = require('path');

//reference the plugin
var hbs = require('nodemailer-express-handlebars');
//Import NodeMailer
var transporter = require('../smtp.js');

const handlebarOptions = {
  viewEngine: {
    extName: '.handlebars',
    partialsDir: 'views/emails',
    layoutsDir: 'views/layouts',
    defaultLayout: 'main.handlebars',
  },
  viewPath: './views/emails',
  extName: '.handlebars',
};

//attach the plugin to the nodemailer transporter
transporter.use('compile', hbs(handlebarOptions));

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log("Received request in Node to send email", req.body);

    var body = req.body;
    var email = Object.keys(body)[0];
    console.log("email", email);

    let mailOptions = {
      from: 'support@datacombusinesssystems.com',
      to: 'ian@datacomnetsol.com',
      subject: 'Databoxx Password Reset',
      text: "Plain text version of the message",
      attachments: [{
        filename: 'Databoxx-BoxLogo-175x196.png',
        path: 'static/images/Databoxx-BoxLogo-175x196.png',
        cid: 'unique@datacom.logo' //same cid value as in the html img src
      }],
      template: 'password-reset',
      context: {
        name: 'Ian Christensen',
        email: email
    }
    };


    transporter.sendMail(mailOptions, function(error, response) {
      if (error) {
        console.log(error);}
      else {
        console.log(response);
          }
      transporter.close();
      });
      
    res.status(200).send('Email Successfully Sent');

    


  
  
});

router.get('/', (req, res) => {
  res.render('./emails/password-reset', {name: 'Ian Christensen', email: "Ian@ian.com"});
})

module.exports = router;
