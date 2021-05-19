const { connect } = require("mongoose")

exports.userOnline = (io, socket, chatId) => {
    socket.join('room')
    io.to('room').emit('a new user join the room')
}

exports.sendMessage = (io, socket, {chatId, msg}) => {
    console.log('message: ', msg)
    io.to('room').emit('NEW_MESSAGE', msg)
}