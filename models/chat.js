const mongoose = require('mongoose')

const Schema = mongoose.Schema

const chatSchema = new Schema({
    messages: [{
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            require: true
        }

    }]
})

module.exports = mongoose.model('Chat', chatSchema)