const mongoose = require('mongoose')

const prescriptionSchema = new mongoose.Schema({
    ProtocA: {
        type: String,
        required: true
    },
    Diag: {
        type: String,
        required: true
    },
    CIN: {
        type: String,
        required: true
    },
    Surv: {
        type: String,
        required: true
    },
    aut: {
        type: String,
        required: true
    },
    Sej: {
        type: Number,
        required: true
    },
    Valid: {
        type: Boolean
    },
    AvisP: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Prescription', prescriptionSchema)