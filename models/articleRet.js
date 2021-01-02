const mongoose = require('mongoose')

const articleRetSchema = new mongoose.Schema({
    unitéSoin: {  
        type: String,
        required: true
    },
    med: {
        type: String,
        required: true
    },
    quantité: {
        type: Number,
        required: true
    },
    motif: {
        type: String,
        required: true
    },
    validation: {
        type: String
    },
    commentaire: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Retour', articleRetSchema)