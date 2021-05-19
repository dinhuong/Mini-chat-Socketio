const Chat = require('../models/chat')
const User = require('../models/user')
const io = require('../socket')
const Objectid = require('mongoose').Types.ObjectId

exports.getChats = (req, res, next) => {
    res.render('home', {
        user: req.session.user
    })
}

exports.postChats = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            res.redirect('/chat/' + user._id.toString())
        })
        .catch(e => console.log(e))
}

exports.getChatUser = (req, res, next) => {
    console.log('getChatUser!')
    User.findById(req.params.userId)
        .then(async partner => {
            const chats = req.session.user.chats
            let messages
            let chat = chats.find(c => c.userId.toString() === partner._id.toString())
            if (!chat) {
                messages = []
            } else {
                messages = await Chat.findById(chat.chatId).messages
                if (!messages) {
                    messages = []
                }
            }
            console.log("message: ", messages)
            console.log("room: ", chat.chatId)
            res.render('chat', {
                sender: req.session.user,
                receiver: partner,
                chatId: chat.chatId
            })
        })
        .catch(e => console.log(e))

}

exports.postSendMessage = (req, res, next) => {
    console.log('send Message!')
    const send = req.session.user
    User.findById(req.params.userId)
        .then(async (recv) => {
            try {
                let existChat = send.chats.find(c => c.userId.toString() === recv._id.toString())
                //chat:{userId, chatId}

                if (!existChat) {
                    //create new Chat
                    const messages = new Chat({ messages: [] })
                    await messages.save()

                    //update user collection

                    //add to sender chats
                    existChat = { userId: recv._id, chatId: messages._id }
                    let updateChats = [...send.chats, existChat]

                    let user = await User.findById(send._id)
                    user.chats = updateChats
                    await user.save()

                    //add to receiver chats

                    user = await User.findById(recv._id)
                    existChat.userId = send._id
                    console.log(chat.userId)
                    updateChats = [...recv.chats, existChat]
                    user.chats = updateChats
                    await user.save()
                }
                //update chat collection
                Chat.findById(existChat.chatId)
                    .then(async c => {
                        //c:{messages:[message:{creator, content}]}
                        if (!c) { c = { messages: [] } }
                        const newMessage = { creator: req.body.creator, content: req.body.content }
                        const updateMessages = [...c.messages, newMessage]
                        
                        const chat = await Chat.findById(existChat.chatId)
                        chat.messages = [...updateMessages]
                        await chat.save()
                        
                        res.status(200)
                    })
                    .catch(e => console.log(e))
            } catch (error) {
                console.log(error)
            }
        })
        .catch(e => console.log(e))
}
