'use strict';
const config = require('./config')
const mailgun = require('mailgun-js')({apiKey: config.MAIL_GUN_KEY, domain: config.DOMAIN});

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
    
  };


  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

const list = mailgun.lists(`mylist@${config.domain}`);

const bob = {
  subscribed: true,
  address: 'bob@example.com'
};

list.members().create(bob, function (error, data) {
  console.log(data);
});
