const [USER_ONLINE, RECEIVE_MESSAGE, SEND_MESSAGE] = ['USER_ONLINE', 'RECEIVE_MESSAGE', 'SEND_MESSAGE']

const chatForm = document.getElementById('chat-form')
const room = document.getElementById('chatId').value
const sendId = document.getElementById('sendId').value

const socket = io()

socket.on('connect', () => {
    console.log(socket.id)
})

socket.emit(USER_ONLINE, sendId)

socket.on('disconnect', () => {
    console.log('disconnect')
})

socket.on(USER_ONLINE, message => {
    console.log(message)
})

socket.on(RECEIVE_MESSAGE, message => {
    console.log('received: ' + message)
    appendMessge(message)
})

// submit message
function sendMessage() {
    console.log('clicked!')

    const room = document.getElementById('chatId').value
    const sendId = document.getElementById('sendId').value
    const msg = document.getElementById('message-input').value
    
    fetch('/chat/' + room, {
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
            socket.emit(SEND_MESSAGE, { room, msg })
            appendMessge(result)
        })
        .catch(e => console.log(e))
}

//update DOM
function appendMessge(msg) {
    const messageInput = document.getElementById('message-input').value
    messageInput.value = ""

    // const messageElement = document.createElement('p')
    // messageElement.innerText = message.content
    // messageContainer.append(messageElement)

}

