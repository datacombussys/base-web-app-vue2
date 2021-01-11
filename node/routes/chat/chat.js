var express = require('express');
var app = express();
var router = express.Router();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users-helper');

let messages = [];
let index = 0;

server.listen(9022);
// WARNING: app.listen(80) will NOT work here!


io.on('connection', (socket) => {
  console.log("User connection made to server");

  //New user Joined
  socket.on('join', ({name, room}, callback) => {
    console.log(`${name} has joined the server. in room ${room}`);
    const {error, user} = addUser({id: socket.id, name, room});
    console.log("error", error);
    console.log("join user", user);
    if(error) return callback(error);
    socket.emit('message', {name: 'Admin', text: `${user.name}, welcome to the ${user.userRoom} room`, avatar: "/static/DatacomLogoSm40x40.png"});
    socket.broadcast.to(user.userRoom).emit('message', {name: 'Admin', text: `${user.name}, has joined the ${user.userRoom} room`, 
                                            avatar: "/static/DatacomLogoSm40x40.png"});

    socket.join(user.userRoom);
    // console.log("socket.room", socket.room);

    //Emit the list of Users in the room
    io.to(user.userRoom).emit('roomData', {room: user.userRoom, users: getUsersInRoom(user.userRoom)});
    // console.log("roomData");

    callback();
   
    // io.emit('userOnline', socket.username);
  });

  //Handle Messages
  socket.on('sendMessage',(msg, callback) => {
    console.log('sendMessage', msg);
    const user = getUser(socket.id);
    console.log('sendMessage user', user);

    //Emit the list of Users in the room
    io.to(user.userRoom).emit('roomData', {room: user.userRoom, users: getUsersInRoom(user.userRoom)});


    let message = {
      image: msg.image,
      name: msg.name,
      text: msg.text,
      avatar: msg.avatar,
      type: msg.type
    }
    messages.push(message);
    console.log('new sendMessage Obj', message);
    io.to(user.userRoom).emit('sendMessage', message);
  });


  
  //Disconnect User from Server
  socket.on('disconnect', () => {
    // console.log(`${socket.id} has left the Server.`);
    const user = removeUser(socket.id);
    console.log('disconnect user', user);


    if(user) {
      io.to(user.userRoom).emit('message', {user: 'Admin', text: `${user.name} has left the room`});
      //Emit the list of Users in the room
      io.to(user.userRoom).emit('roomData', {room: user.userRoom, users: getUsersInRoom(user.userRoom)});
    }

    
 
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
