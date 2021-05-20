const socketController = require('../controllers/socket')
const {USER_ONLINE, SEND_MESSAGE} = require('../socketEvent')

const socketRouter = (io, socket) => {
    console.log('client!')

    socket.on(USER_ONLINE, data => socketController.userOnline(io, socket, data))

    socket.on(SEND_MESSAGE, data => socketController.sendMessage(io, socket, data))

}

module.exports = socketRouter