const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    content: {
        type: String
    },
    username: {
        type: String
    },
    color: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Message', messageSchema)