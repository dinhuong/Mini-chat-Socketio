const {USER_ONLINE, RECEIVE_MESSAGE, JOIN_CHAT} = require('../socketEvent')
const User = require('../models/user')
const Chat = require('../models/chat')

exports.userOnline = async (io, socket, userId) => {
    // socket.join(room)
    // console.log('join ', room)
    // io.to(room).emit('a new user join the room')
    const user = await User.findById(userId)
    console.log(user.chats)
    if (user.chats) {
        for(var room of user.chats){
            socket.join(room.toString())
            console.log('join', room)
            io.to(room.toString()).emit(USER_ONLINE, 'a new user join the room')
        }
    }
    
}

exports.sendMessage = async (io, socket, data) => {
    //data {room, msg:{creator, content}}
    console.log('send Message!')
    try {
        const commonChat = await Chat.findById(data.room)
        const newMessage = { creator: data.msg.creator, content: data.msg.content }

        commonChat.messages = [...commonChat.messages, newMessage]
        await commonChat.save()
        console.log('server send :', data.room, data.msg.content)
        io.to(data.room).emit(RECEIVE_MESSAGE, data.msg.content)
    } catch (error) {
        console.log(error)
    }
}

exports.joinChat = async(io, socket, data) => {
    //data {sendId, recvId}
    console.log('getChatUser!')
    
    const send = await User.findById(data.sendId)
    const recv = await User.findById(data.recvId)

    let commonChats = send.chats.filter(c => recv.chats.includes(c))
    let commonChat = commonChats[0]
    console.log(send.username, " , ", recv.username, " commonChats: ", commonChat)

    if (!commonChat) {
        //create new Chat
        commonChat = new Chat({ members: [send._id, recv._id], messages: [] })
        await commonChat.save()

        //update user collection

        let user = await User.findById(send._id)
        user.chats = [...user.chats, commonChat._id]
        await user.save()
        console.log('send:', user)
      
        recv.chats = [...recv.chats, commonChat._id]
        await recv.save()
        console.log('recv:', recv)
    } else {
        commonChat = await Chat.findById(commonChat)
    }

    io.to(socket.id).emit(JOIN_CHAT, commonChat)
}