const express = require('express')
const router = express.Router()
const ArticleFourn = require('./../models/articleFourn.js')

router.get('/new', (req,res) => {
    res.render('articlesFourn/new', { articleFourn: new ArticleFourn() })
})

router.get('/edit/:id', async (req,res) => {
    try{
    const articleFourn = await ArticleFourn.findById(req.params.id)
    res.render('articlesFourn/edit', { articleFourn: articleFourn })
    }catch(e){
     res.redirect('/liste6')   
    }
})

router.get('/:id', async (req,res) => {
    try{
    const articleFourn = await ArticleFourn.findById(req.params.id)
    res.render('articlesFourn/show', { articleFourn: articleFourn })
    }catch(e){
        res.redirect('/liste6') //if (article == null) 
    }
})
//nomF prénom adresse  companie émail numéro
 
router.post('/', async (req,res) => {
    let articleFourn = new ArticleFourn({  
        nomF: req.body.nomF,
        prénom : req.body.prénom,
        adresse: req.body.adresse,
        companie: req.body.companie,
        émail: req.body.émail,
        numéro: req.body.numéro
    })
    try{
    articleFourn = await articleFourn.save()
    res.redirect(`/articlesFourn/${articleFourn.id}`)
    }catch(e){
        res.render('articlesFourn/new', { articleFourn: articleFourn})
    }
})

router.delete('/:id', async (req,res) => {
    try{
    await ArticleFourn.findByIdAndDelete(req.params.id)
    res.redirect('/liste6')
    }catch(e){
    res.redirect('/liste6')
    }
})

router.put('/:id', async (req,res) => {
    let articleFourn = await ArticleFourn.findById(req.params.id)
        articleFourn.nomF = req.body.nomF
        articleFourn.prénom = req.body.prénom
        articleFourn.adresse = req.body.adresse
        articleFourn.companie = req.body.companie
        articleFourn.émail = req.body.émail
        articleFourn.numéro = req.body.numéro
        
    try{
    articleFourn = await articleFourn.save()
    res.redirect(`/articlesFourn/${articleFourn.id}`)
    }catch(e){
        res.render('articlesFourn/edit', { articleFourn: articleFourn})
    }
})

module.exports = router