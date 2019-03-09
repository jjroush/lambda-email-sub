'use strict';
const config = require('./config')
const mailgun = require('mailgun-js')({apiKey: config.MAIL_GUN_KEY, domain: config.DOMAIN});



module.exports.emailSub = (event, context, callback) => {
  const list = mailgun.lists(`${config.NAME}@${config.DOMAIN}`);
  console.log('address', event.body);

  const newSub = {
    subscribed: true,
    address: event.body,
    name: '',
    vars: {}
  };



  list.members().create(newSub).then(function (data) {

  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*', // Required for CORS support to work
    },
    body: JSON.stringify({ "message": "Hello World!" })
  };


  callback(null, response);

  });
};