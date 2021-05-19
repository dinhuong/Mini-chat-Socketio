const messageInput = document.getElementById('message-input')
const sendId = document.getElementById('sendId').value
const recvId = document.getElementById('recvId').value
const chatId = document.getElementById('chatId').value

const socket = io()

socket.on('connect', () => {
    console.log(socket.id)
    socket.emit('USER_ONLINE', chatId)
})

socket.on('USER_ONLINE', message => {
    console.log(message)
})

socket.on('server-message', message => {
    console.log(message)
})

socket.on('NEW_MASSGE', message => {
    console.log('received: ' + message.content)
    appendMessge(message)
})

function appendMessge(message) {
    messageInput.value = ""

    // const messageElement = document.createElement('p')
    // messageElement.innerText = message.content
    // messageContainer.append(messageElement)

}

function sendMessage() {

    console.log('clicked!')

    const msg = messageInput.value

    fetch('/chat/' + recvId, {
        method: 'POST',
        body: JSON.stringify({
            creator: sendId,
            content: msg
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(result => {
            console.log('result')
        })
        .catch(e => console.log(e))

    socket.emit('SEND_MESSAGE', { chatId, msg })
}
