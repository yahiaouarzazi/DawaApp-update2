const express = require('express')
const router = express.Router()
const ArticleLT = require('./../models/articleLT.js')

router.get('/new', (req,res) => {
    res.render('articlesLT/new', { articleLT: new ArticleLT() })
})

router.get('/edit/:id', async (req,res) => {
    try{
    const articleLT = await ArticleLT.findById(req.params.id)
    res.render('articlesLT/edit', { articleLT: articleLT })
    }catch(e){
     res.redirect('/liste')   
    }
})

router.get('/:id', async (req,res) => {
    try{
    const articleLT = await ArticleLT.findById(req.params.id)
    res.render('articlesLT/show', { articleLT: articleLT })
    }catch(e){
        res.redirect('/liste4') //if (article == null) 
    }
})
 
router.post('/', async (req,res) => {
    let articleLT = new ArticleLT({
        nom : req.body.nom,
        NombreB : Number(req.body.NombreB),
        codeP : req.body.codeP,
        modeA : req.body.modeA,
        Posologie : req.body.Posologie,
        contreI: req.body.contreI,
        DoseM: Number(req.body.DoseM),
        categorie: req.body.categorie,
        FreqM: Number(req.body.FreqM)
    })
    try{
    articleLT = await articleLT.save()
    res.redirect(`/articlesLT/${articleLT.id}`)
    }catch(e){
        console.log(e)
    }
})

router.delete('/:id', async (req,res) => {
    try{
    await ArticleLT.findByIdAndDelete(req.params.id)
    res.redirect('/liste4')
    }catch(e){
    res.redirect('/liste4')
    }
})

router.put('/:id', async (req,res) => {
    let articleLT = await ArticleLT.findById(req.params.id)
        articleLT.nom = req.body.nom
        articleLT.NombreB = Number(req.body.NombreB)
        articleLT.codeP= req.body.codeP
        articleLT.modeA= req.body.modeA
        articleLT.Posologie= req.body.Posologie
        articleLT.contreI= req.body.contreI
        articleLT.DoseM= Number(req.body.DoseM)
        articleLT.categorie= req.body.categorie
        articleLT.FreqM= Number(req.body.FreqM)
        
    try{
    articleLT = await articleLT.save()
    res.redirect(`/articlesLT/${articleLT.id}`)
    }catch(e){
        res.render('articlesLT/edit', { articleLT: articleLT})
    }
})

module.exports = router