const Chat = require('../models/chat')
const User = require('../models/user')
const io = require('../socket')
const {RECEIVE_MESSAGE} = require('../socketEvent')

exports.getChats = async (req, res, next) => {
    const userArr = await User.find()
    res.render('chat', {
        user: req.session.user,
        userArr: userArr
    })
}

exports.postChats = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            res.redirect('/chat/' + user._id.toString())
        })
        .catch(e => console.log(e))
}

exports.getChatUser = async (req, res, next) => {
    console.log('getChatUser!')
    const send = req.session.user
    const recv = await User.findById(req.params.userId)

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

    res.render('chat', {
        sender: send,
        receiver: recv,
        chatId: commonChat._id.toString()
    })
}

exports.postSendMessage = async (req, res, next) => {
    console.log('send Message!')
    try {
        const commonChat = await Chat.findById(req.params.chatId)
        const newMessage = { creator: req.body.creator, content: req.body.content }

        commonChat.messages = [...commonChat.messages, newMessage]
        await commonChat.save()

        io.getIO().to(commonChat._id).emit(RECEIVE_MESSAGE, newMessage.content)

        res.status(200).json(newMessage)
    } catch (error) {
        console.log(error)
    }
}
