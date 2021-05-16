let io

module.exports = {
    init: server => {
        console.log('init socket.io!')
        io = require('socket.io')(server)
        return io
    },
    getIO: () => {
        if (!io) {
            throw new Error('Socket.io not initialized!')
        }
        return io
    }
}