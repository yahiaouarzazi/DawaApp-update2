const mongoose = require('mongoose')

const articleFournSchema = new mongoose.Schema({
    nomF: { 
        type: String,
        required: true
    },
    prénom: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    companie: {
        type: String,
        required: true
    },
    émail: {
        type: String,
        required: true
    },
    numéro: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Fournisseur', articleFournSchema)