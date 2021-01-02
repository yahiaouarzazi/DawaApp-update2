const express = require('express')
const router = express.Router()
const Article = require('./../models/article.js')

router.get('/new', (req,res) => {
    res.render('articles/new', { article: new Article() })
})

router.get('/edit/:id', async (req,res) => {
    try{
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
    }catch(e){
     res.redirect('/liste/tout')   
    }
})

router.get('/:slug', async (req,res) => {
    try{
    const article = await Article.findOne({slug: req.params.slug})
    res.render('articles/show', { article: article })
    }catch(e){
        res.redirect('/liste/tout') //if (article == null) 
    }
})

router.post('/', async (req,res) => {
    let article = new Article({
        nom: req.body.nom,
        Nlot: req.body.Nlot,
        datePeremption: new Date(req.body.datePeremption),
        prix: Number(req.body.prix),
        codeP: req.body.codeP,
        categorie: req.body.categorie,
        sP: Number(req.body.sP),
        s1: Number(req.body.s1),
        s2: Number(req.body.s2),
        s3: Number(req.body.s3)
    })
    try{
    article = await article.save()
    res.redirect(`/articles/${article.slug}`)
    }catch(e){
        res.render('articles/new', { article: article})
    }
})

router.delete('/:id', async (req,res) => {
    try{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/liste/tout')
    }catch(e){
    res.redirect('/liste/tout')
    }
})

router.put('/:id', async (req,res) => {
    let article = await Article.findById(req.params.id)
        article.nom = req.body.nom
        article.Nlot= req.body.Nlot
        article.datePeremption= new Date(req.body.datePeremption)
        article.prix= Number(req.body.prix)
        article.codeP= req.body.codeP
        article.categorie= req.body.categorie
        article.sP= Number(req.body.sP)
        article.s1= Number(req.body.s1)
        article.s2= Number(req.body.s2)
        article.s3= Number(req.body.s3)
    try{
    article = await article.save()
    res.redirect(`/articles/${article.slug}`)
    }catch(e){
        res.render('articles/edit', { article: article})
    }
})

module.exports = router