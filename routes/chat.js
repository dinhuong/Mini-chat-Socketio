const express = require('express')
const chatController = require('../controllers/chat')

const router = express.Router()

router.get('/', chatController.getChats)

router.post('/', chatController.postChats)

router.get('/:userId', chatController.getChatUser)

router.post('/:userId', chatController.postSendMessage)

module.exports = router