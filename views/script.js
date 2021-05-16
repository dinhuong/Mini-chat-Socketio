// import socket from 'socket.io-client'
// socket('http://localhost/3000')

const sendButton = document.getElementById('send-button')
const messageContainer = document.getElementById('message-container')


const socket = io('http://localhost/3000')

socket.on('server-message', message => {
    console.log(message)
})

socket.on('new-message', message => {
    console.log('received: ' + message)
    appendMessge(message)
})

function appendMessge(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message.content

    const messageInput = document.getElementById('message-input')
    inputMessage.value = ""
    messageContainer.append(messageElement)
}

function sendMessage() {
    const messageInput = document.getElementById('message-input')
    const sendId = document.getElementById('sendId').value
    const recvId = document.getElementById('recvId').value

    console.log('clicked!')
    console.log(sendId)
    console.log(recvId)
    fetch('/chat/' + recvId, {
        method: 'POST',
        body: JSON.stringify({
            creator: sendId,
            content: messageInput.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(result => {
            
        })
        .catch(e => console.log(e))
}
