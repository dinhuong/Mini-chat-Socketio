const [USER_ONLINE, RECEIVE_MESSAGE, SEND_MESSAGE, JOIN_CHAT] = ['USER_ONLINE', 'RECEIVE_MESSAGE', 'SEND_MESSAGE', 'JOIN_CHAT']

const sendId = document.getElementById('sendId').value

var room 

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

socket.on(JOIN_CHAT, chatInfo => {
    room = chatInfo._id
    console.log('chatInfo: ' + chatInfo)
})

function chatTest1() {
    var recvId = document.getElementById('test1').value
    joinChat(recvId)
}

function chatTest2() {
    var recvId = document.getElementById('test2').value
    joinChat(recvId)
}

function chatTest3() {
    var recvId = document.getElementById('test3').value
    joinChat(recvId)
}

function joinChat(recvId){
    socket.emit(JOIN_CHAT, {sendId, recvId})
}

// submit message
function sendMessage() {
    console.log('clicked!')

    const creator = document.getElementById('sendId').value
    const content = document.getElementById('message-input').value
    const msg = { creator, content }

    socket.emit(SEND_MESSAGE, { room, msg })

}

//update DOM
function appendMessge(msg) {
    const messageInput = document.getElementById('message-input').value
    messageInput.value = ""

    // const messageElement = document.createElement('p')
    // messageElement.innerText = message.content
    // messageContainer.append(messageElement)

}

