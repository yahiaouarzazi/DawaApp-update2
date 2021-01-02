const mongoose = require('mongoose')

const user2Schema = new mongoose.Schema({
       name: {
        type: String,
        required: true
       },
       email: {
        type: String,
        required: true,
        trim: true
       },
       password: {
        type: String,
        required: true
       },
       role: {
        type: String,
        default: 'basic',
        enum: ["basic", "supervisor", "admin"]
       },
       accessToken: {
        type: String
       }
})

module.exports = mongoose.model('Utilisateur2', user2Schema)