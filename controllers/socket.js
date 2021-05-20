const {USER_ONLINE, RECEIVE_MESSAGE} = require('../socketEvent')
const User = require('../models/user')
const Chat = require('../models/chat')

exports.userOnline = async (io, socket, room) => {
    socket.join(room)
    console.log('join ', room)
    io.to(room).emit('a new user join the room')
    // const user = await User.findById(userId)
    // console.log(user.chats)
    // if (user.chats) {
    //     for(var room of user.chats){
    //         socket.join(room)
    //         console.log('join ', room)
            
    //     }
    // }
    io.emit(USER_ONLINE, 'a new user join the room')
}

exports.sendMessage = (io, socket, data) => {
    //data {room, msg}
    console.log('server send :', data.room, data.msg)
    io.to(data.room).emit(RECEIVE_MESSAGE, data.msg)
}