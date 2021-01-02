const mongoose = require('mongoose')

const articleCMSchema = new mongoose.Schema({
    Ncom: {
        type: String,
        required: true
    },
    nomP: {
        type: String,
        required: true
    },
    quantité: {
        type: Number,
        required: true
    },
    CINpharmacien: {
        type: String,
        required: true
    },
    nomF: {
        type: String,
        required: true
    },
    dateLivraison: { 
        type: String
    },
    quantitélivrée: {
        type: String
    },
    validationLivraison: {
        type: Boolean
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model('Commande', articleCMSchema)