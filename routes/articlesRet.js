const express = require('express')
const router = express.Router()
const ArticleRet = require('./../models/articleRet.js')

router.get('/new', (req,res) => {
    res.render('articlesRet/new', { articleRet: new ArticleRet() })
})

router.get('/edit/:id', async (req,res) => {
    try{
    const articleRet = await ArticleRet.findById(req.params.id)
    res.render('articlesRet/edit', { articleRet: articleRet })
    }catch(e){
     res.redirect('/liste7')   
    }
})

router.get('/:id', async (req,res) => {
    try{
    const articleRet = await ArticleRet.findById(req.params.id)
    res.render('articlesRet/show', { articleRet: articleRet })
    }catch(e){
        res.redirect('/liste7') //if (article == null) 
    }
})
//unitéSoin med quantité  motif validation commentaire
 
router.post('/', async (req,res) => { 
    let articleRet = new ArticleRet({  
        unitéSoin: req.body.unitéSoin,
        med : req.body.med,
        quantité: Number(req.body.quantité),
        motif: req.body.motif,
        validation: req.body.validation,
        commentaire: req.body.commentaire
    })
    try{
    articleRet = await articleRet.save()
    res.redirect(`/articlesRet/${articleRet.id}`)
    }catch(e){
        res.render('articlesRet/new', { articleRet: articleRet})
    }
})

router.delete('/:id', async (req,res) => {
    try{
    await ArticleRet.findByIdAndDelete(req.params.id)
    res.redirect('/liste7')
    }catch(e){
    res.redirect('/liste7')
    }
})

router.put('/:id', async (req,res) => {
    let articleRet = await ArticleRet.findById(req.params.id)
        articleRet.unitéSoin = req.body.unitéSoin
        articleRet.med = req.body.med
        articleRet.quantité = Number(req.body.quantité)
        articleRet.motif = req.body.motif
        articleRet.validation = req.body.validation
        articleRet.commentaire = req.body.commentaire
        
    try{
    articleRet = await articleRet.save()
    res.redirect(`/articlesRet/${articleRet.id}`)
    }catch(e){
        res.render('articlesRet/edit', { articleRet: articleRet})
    }
})

module.exports = router