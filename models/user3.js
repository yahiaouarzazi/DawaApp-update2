const mongoose = require('mongoose')

const user3Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["medecin", "pharmacien", "pharmacienP", "admin"]
       }
})

module.exports = mongoose.model('Utilisateur3', user3Schema)