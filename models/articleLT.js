const mongoose = require('mongoose')


const articleLT2Schema = new mongoose.Schema({
    nom: {
        type: String
    },
    codeP: {
        type: String
    },
    modeA: {
        type: String
    },
    Posologie: {
        type: String
    },
    FreqM: {
        type: Number
    },
    NombreB: {
        type: Number
    },
    contreI: {
        type: String
    },
    DoseM: {
        type: Number
    },
    categorie: {
        type: String
    },
    RelationInterMedic: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('MédicamentLT2', articleLT2Schema)