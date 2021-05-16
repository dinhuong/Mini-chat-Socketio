const io = require('socket.io-client')
client = io('http://localhost:8080')

client.on('server-message', data => {
    console.log(data)
})