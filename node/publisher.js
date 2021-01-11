#!/usr/bin/env node
var amqp = require('amqplib');

// const port = 5672;
var message = 'I got it working!!!';
//Rabbit MQ amqp Sender
async function connect() {
  try {
  const connection = await amqp.connect('amqp://localhost:5672');
  //Create Channel
  const channel = await connection.createChannel();
  //Declare Queue to send to
  const result = await channel.assertQueue('jobs');
  channel.sendToQueue('jobs', Buffer.from(JSON.stringify(message)));
  console.log('Message was sent:', message);
  }
  catch (error){
    console.log('The error is:', error);
  }
}
connect();


// amqp.connect('amqp://localhost', function(error0, connection) {
//     if (error0) {
//         throw error0;
//     }
//     connection.createChannel(function(error1, channel) {
//         if (error1) {
//             throw error1;
//         }

//         var queue = 'hello';
//         var msg = 'Hello World!';

//         channel.assertQueue(queue, {
//             durable: false
//         });
//         channel.sendToQueue(queue, Buffer.from(msg));

//         console.log(" [x] Sent %s", msg);
//     });
//     setTimeout(function() {
//         connection.close();
//         process.exit(0);
//     }, 500);
// });
