const users = [];

const addUser = ({id, name, room, avatar}) => {
  console.log(`addUser id:${id}, name:${name}, room:${room}`);
  //MarketingRoom = marketing room
  const userRoom = room.trim().toLowerCase();

  //Check to see if current user already exists in room
  const existingUser = users.find((user) => user.name === name && user.room === userRoom);

  if(existingUser) {
    return {error: "Username is already taken"};
  }
  const user = {id, name, userRoom, avatar};
  users.push(user);

  console.log('addUser users', users);

  return {user}
}

const getUser = function(id) {
  console.log('getusers', users);
  const foundUser = users.find(each => each.id === id);
    // console.log('getusers user', each);
    // console.log('getusers id', id);
  console.log('getusers user2', foundUser);
  return foundUser
}

const getUsersInRoom = (room) => {
  const allUsers = users.filter(user => user.userRoom === room);

  console.log('getUsersInRoom allUsers', allUsers);
  return allUsers
}

const removeUser = (id) => {
  console.log('removeUser users', users);
  const index = users.findIndex(user => user.id === id);
  console.log('removeUser index', index);

  if(index !== -1) {
    console.log('removeUser users users.slice(index, 1)[0]', users.slice(index, 1)[0]);
    return users.slice(index, 1)[0];
  } 
}


module.exports = {addUser, removeUser, getUser, getUsersInRoom}