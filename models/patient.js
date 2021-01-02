const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    nomP: {
        type: String,
        required: true
    },
    prenomP: {
        type: String,
        required: true
    },
    sexeP: {
        type: String,
        required: true
    },
    ageP: {
        type: Number,
        required: true
    },
    CIN: {
        type: String,
        required: true
    },
    traitementAnterieur: {
        type: String
    },
    traitementenCours: {
        type: String
    },
    Antecedents_Allergies: {
        type: String
    },
    donnees_physio_bio: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Patient', patientSchema)