const express = require('express')
const router = express.Router()
const ArticleCM = require('./../models/articleCM.js')
const ArticleFourn = require('./../models/articleFourn.js')
const Article = require('./../models/article.js')

router.get('/new', (req,res) => {
    res.render('articlesCM/new', { articleCM: new ArticleCM() })
})

router.get('/edit/:id', async (req,res) => {
    try{
    const articleCM = await ArticleCM.findById(req.params.id)
    res.render('articlesCM/edit', { articleCM: articleCM })
    }catch(e){
     res.redirect('/liste5')   
    }
})

router.get('/:id', async (req,res) => {
    try{
    const articleCM = await ArticleCM.findById(req.params.id)
    const article = await Article.findOne({nom: articleCM.nomP})
    
    try{
    const articleFourn = await ArticleFourn.findOne({nomF: articleCM.nomF})
    companie = articleFourn.companie
    email = articleFourn.émail
    }catch(e){
        companie = "introuvable"
        email = "introuvable"
    }
    Prix = articleCM.quantité * article.prix
    if (Prix >0 & Prix < 100){
        TVA = 0.02
    }if(Prix < 500 & Prix >100){
        TVA = 0.05
    }if(Prix < 1000 & Prix >500){
        TVA = 0.06
    }if(Prix < 2000 & Prix >1000){
        TVA = 0.1
    }if(Prix < 10000 & Prix >2000){
        TVA = 0.2
    }
    TOTAL = Prix * (1 + TVA)
    if(articleCM.quantitélivrée != null & articleCM.quantitélivrée != 0 ){
    if(articleCM.quantitélivrée < articleCM.quantité){
        alerte = 'Attention quantité livrée inférieure à celle demandée'
    }else{
        alerte = 'Quantité livrée conforme à la commande'
    }
    }else{
        alerte = 'article pas encore livré'
    }
  
    res.render('articlesCM/show', { articleCM: articleCM,
                                    stock: article.sP,
                                    prixUnité: article.prix,
                                    Prix: Prix,
                                    TVA: TVA,
                                    TOTAL:TOTAL,
                                    alerte: alerte,
                                    slug: article.slug,
                                    email: email,
                                    companie: companie

    })
    }catch(e){
        res.redirect('/liste5') //if (article == null) 
    }
})

router.post('/', async (req,res) => {
    let articleCM = new ArticleCM({
        Ncom: req.body.Ncom,
        quantité : Number(req.body.quantité),
        nomP: req.body.nomP,
        CINpharmacien: req.body.CINpharmacien,
        nomF: req.body.nomF,  
        dateLivraison: req.body.dateLivraison,
        quantitélivrée: req.body.quantitélivrée,
        validationLivraison: req.body.validationLivraison
    })
    try{
    articleCM = await articleCM.save()
    res.redirect(`/articlesCM/${articleCM.id}`)
    }catch(e){
        res.render('articlesCM/new', { articleCM: articleCM})
    }
})

router.delete('/:id', async (req,res) => {
    try{
    await ArticleCM.findByIdAndDelete(req.params.id)
    res.redirect('/liste5')
    }catch(e){
    res.redirect('/liste5')
    }
})

router.put('/:id', async (req,res) => {
    let articleCM = await ArticleCM.findById(req.params.id)
        articleCM.Ncom = req.body.Ncom
        articleCM.quantité = Number(req.body.quantité)
        articleCM.nomP = req.body.nomP
        articleCM.CINpharmacien = req.body.CINpharmacien
        articleCM.nomF = req.body.nomF
        articleCM.dateLivraison = req.body.dateLivraison
        articleCM.quantitélivrée = req.body.quantitélivrée
        articleCM.validationLivraison = req.body. validationLivraison
        
    try{
    articleCM = await articleCM.save()
    res.redirect(`/articlesCM/${articleCM.id}`)
    }catch(e){
        res.render('articlesCM/edit', { articleCM: articleCM})
    }
})

module.exports = router