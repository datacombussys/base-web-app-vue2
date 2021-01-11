var express = require('express');
var app = express();
var router = express.Router();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const {addUser, removeUser, getUser, getUsersinRoom} = require('./users-helper');

let users = [];
let messages = [];
let index = 0;

server.listen(9022);
// WARNING: app.listen(80) will NOT work here!


io.on('connection', (socket) => {
  console.log("User connection made to server");

  //Need to figure this one out where does it fit.
  // socket.emit('loggedIn', {
  //   users: users.map(each => each.username),
  //   messages: messages
  // });


  //New user Joined
  socket.on('join', ({name, room}, callback) => {
    const {error, user} = addUser({id: socket.id, name, room});

    if(error) return callback(error);
    socket.emit('message', {name: 'Admin', text: `${user.name}, welcome to the ${user.room} room`});
    socket.broadcast.to(user.room).emit('message', {name: 'Admin', text: `${user.name}, jas joined the ${user.room} room`});

    socket.join(user.room);

    callback();
    // socket.username = username;
    // users.push(socket);
    // console.log("socket from newUser", socket);

    // const error = false;
    // if(error) {
    //   callback({error: "An error has occured trying to add a new user to the chat room"})
    // }

    io.emit('userOnline', socket.username);
  });

  //Handle Messages
  socket.on('sendMessage',(msg, callback) => {
    console.log('sendMessage', msg);
    let message = {
      index: index,
      image: msg.image,
      username: msg.username,
      text: msg.text
    }
    messages.push(message);
    io.emit('clientMsg', message);
    index++;
  });

  //User Left the Server
  socket.on('userLeftServer', data => {
    console.log("userLeft date from server", data);

    io.emit('userOnline', "New Data");
  });
  
  //Disconnect User from Server
  socket.on('disconnect', () => {
    console.log(`${socket.username} has left the Server.`);
    io.emit('userLeft', socket.username);
    users.splice(users.indexOf(socket), 1)
  });

});


//Socket Route
router.get('/socket', (req, res) => {
  // res.sendFile(__dirname + '/views/index.html');
  console.log("You have successfully connected to the Socket.io server");
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
