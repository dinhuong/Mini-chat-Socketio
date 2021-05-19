const socketController = require('../controllers/socket')

const socketRouter = (io, socket) => {

    {
        console.log('client!')
        socket.emit('server-message', 'Client connected!')
    }

    socket.on('USER_ONLINE', data => socketController.userOnline(io, socket, data))

    socket.on('SEND_MESSAGE', data => socketController.sendMessage(io, socket, data))

}

module.exports = socketRouter