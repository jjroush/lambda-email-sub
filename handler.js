'use strict';
const config = require('./config')
const mailgun = require('mailgun-js')({apiKey: config.MAIL_GUN_KEY, domain: config.DOMAIN, publicApiKey: config.MAIL_GUN_PUB_KEY});



module.exports.emailSub = (event, context, callback) => {
  const list = mailgun.lists(`${config.NAME}@${config.DOMAIN}`);

  const newSub = {
    subscribed: true,
    address: event.body,
    name: '',
    vars: {}
  };


 mailgun.validate(event.body, function (err, body) {
   console.log(body);
    if (body && body.is_valid) {
      list.members(event.body).info(function (err, members) {
        if (members.member.subscribed) {
          const response = {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin' : '*', // Required for CORS support to work
            },
            body: JSON.stringify({ "message": "Already Added" })
          };
          callback(null, response);
        }
      });
      list.members().create(newSub).then(function (err, data) {
        const response = {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*', // Required for CORS support to work
          },
          body: JSON.stringify({ "message": "Success" })
        };
        callback(null, response);
        }).catch(console.log(err));
    } else {
      const response = {
        statusCode: 422,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*', // Required for CORS support to work
        },
        body: JSON.stringify({ "message": "Invalid Email" })
      };
      callback(null, response);
    }
});

};