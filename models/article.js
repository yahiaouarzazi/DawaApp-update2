const mongoose = require('mongoose')
const slugify = require('slugify')

const articleSchema = new mongoose.Schema({
    Nlot: {
        type: String,
        required: true
    },
    datePeremption: {
        type: String,
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    codeP: {
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    sP: {
        type: Number
    },
    categorie: {
        type: String,
        required: true
    },
    s1: {
        type: Number
    },
    s2: {
        type: Number
    },
    s3: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

articleSchema.pre('validate', function(next){
    if (this.nom){
        this.slug = slugify(this.nom, { lower: true,strict: true})
    }
    next()
})

module.exports = mongoose.model('Médicament', articleSchema)