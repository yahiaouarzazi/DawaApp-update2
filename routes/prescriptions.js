const express = require('express')
const router = express.Router()
const Prescription = require('./../models/prescription.js')
const ArticleLT = require('./../models/articleLT.js')
const Patient = require('./../models/patient.js')
const Article = require('./../models/article.js')

router.get('/new', (req,res) => {
    res.render('prescriptions/new', { prescription: new Prescription() })
})

router.get('/simulation1', (req,res) => {
    res.render('prescriptions/simulation1', { codeP2ver: '',
        CIN2ver: '',
        resultat: '',
        effet: '',
        position: ''
         })
})
router.post('/postersim1', async (req,res) => {
    try{
    const articleLT  = await ArticleLT.findOne({codeP: req.body.codeP2})
    const patient = await Patient.findOne({CIN: req.body.CIN2})
    var myString = articleLT.contreI;

    var result = myString.indexOf(patient.Antecedents_Allergies);

    if(result > -1){
        res.render('prescriptions/simulation1', { codeP2ver: req.body.codeP2,
                                                  CIN2ver: req.body.CIN2,
                                                  resultat: 'Attention éventuel effet indésirable pour ce patient !',
                                                  effet: patient.Antecedents_Allergies,
                                                  position: result
                                                   })
    }else{
        res.render('prescriptions/simulation1', { codeP2ver: req.body.codeP2,
                                                  CIN2ver: req.body.CIN2,
                                                  resultat: 'Aucun effet indésirable pour patient',
                                                  effet: '',
                                                  position: ''
                                                   })
    }
    }catch(e){
        res.render('prescriptions/simulation1', { codeP2ver: req.body.codeP2,
            CIN2ver: req.body.CIN2,
            resultat: 'Patient ou article introuvable !',
            effet:'',
            position: ''
             })
    }
})

router.get('/simulation2', (req,res) => {
    res.render('prescriptions/simulation2', { codeP2ver: 'code',
                                              sejour2: 0,
                                              nombreJ: 0,
                                              resultat: 0,
                                              texte: '',
                                              WarnFreq : '',
                                              WarnStock: '',
                                              tab: [0]
                                              })
})
router.post('/postersim2', async (req,res) => {
    try{
    const articleLT  = await ArticleLT.findOne({codeP: req.body.codeP2})
    const article  = await Article.findOne({codeP: req.body.codeP2})
    
    quantité = parseInt(Number(req.body.sejour)*Number(req.body.nombreJ)/articleLT.NombreB) + 1
    var articleeq = []

    if(quantité > article.sP){
        message2 = 'Quantité non dispo en Stock = ' +  article.sP
        try{
        const article2  = await Article.find({categorie: article.categorie
                                                })
        var i = 0
        while(i < article2.length){
            if(article2[i].codeP != req.body.codeP2){
                articleeq[i] = article2[i]
            }
            i++
        }    
        }catch(e){
        articleeq = [0]
        }
        }else{
        message2 = 'Quantité dispo en Stock = ' + article.sP
        articleeq = [0]
        }
         

    if(Number(req.body.nombreJ) > articleLT.FreqM){
        message = 'Attention ! Fréquence administration journalière supérieure au max thérapeutique.'
    }else{
        message = 'aucune alerte'
    }
    res.render('prescriptions/simulation2', { codeP2ver: req.body.codeP2,
                                                  sejour2: req.body.sejour,
                                                  nombreJ: req.body.nombreJ,
                                                  resultat: quantité,
                                                  texte: 'Calcul effectué ! Veuillez trouver la quantité à commander:',
                                                  WarnFreq : message,
                                                  WarnStock: message2,
                                                  tab: articleeq
                                                   })
  
    }catch(e){
        res.render('prescriptions/simulation2', { codeP2ver: req.body.codeP2,
                                                 sejour2: req.body.sejour,
                                                 nombreJ: req.body.nombreJ,
                                                 resultat: 0,
                                                 texte: 'Produit inexistant en livret thérapeutique',
                                                 WarnFreq : '',
                                                 WarnStock: '',
                                                 tab: [0]
                                                   })
    }
})
router.get('/edit/:id', async (req,res) => {
    try{
    const prescription = await Prescription.findById(req.params.id)
    res.render('prescriptions/edit', { prescription: prescription })
    }catch(e){
     res.redirect('/liste2/tout')   
    }
})

router.get('/:id', async (req,res) => {
    try{
    const prescription = await Prescription.findById(req.params.id)
    res.render('prescriptions/show', { prescription: prescription })
    }catch(e){
        res.redirect('/liste2/tout') //if (article == null) 
    }
})

router.get('/impression/:id', async (req,res) => {
   
    const prescription = await Prescription.findById(req.params.id)
    const pdf = require('pdf').pdf
    const fs = require('fs')

    var doc = new pdf()
    
    const slugify = require('slugify')

    doc.setFontSize(22)
    doc.text(35, 20, "Prescription a presenter au pharmacien")
    doc.setFontSize(10)
    doc.text(50, 30, "Imprimee et elaboree dans l'application web DAWA")

    doc.setFontSize(12)
    doc.text(20, 60, "Autorisation medecin : " + prescription.aut + 
    "  /     " + prescription.createdAt.toLocaleDateString() + "    /"
    + "    CIN du patient: " + prescription.CIN)

    doc.setFontSize(16)
    doc.text(20, 90, slugify(prescription.Diag, { lower: true,strict: true}))
    doc.setFontSize(12)
    doc.text(20, 100,"Protocole d'administration: " + slugify(prescription.ProtocA, { lower: true,strict: true}))
    doc.text(20, 110,"Surveillance: " + slugify(prescription.Surv, { lower: true,strict: true}))

    doc.text(20, 140,"Sejour: " + prescription.Sej)
    doc.text(40, 140,"     Validation pharmaceutique: " + prescription.Valid)
    doc.text(80, 165,"Espace signature :")
  
   
    doc.setProperties({
    title:'title',
    subject: 'COMMANDE',
    creator: 'Yahia',
    keywords: 'commande'
    })

    var filename = prescription.aut + ".pdf"

    fs.writeFile(filename, doc.output(), function(err,data){
    console.log("File pdf created")
    })
    res.redirect('/liste2/tout')
})

router.post('/', async (req,res) => {
    let prescription = new Prescription({
        ProtocA: req.body.ProtocA,
        Surv: req.body.Surv,
        Diag: req.body.Diag,
        CIN: req.body.CIN,
        aut : req.body.aut,
        Sej : Number(req.body.Sej),
        Valid : req.body.Valid,
        AvisP : req.body.AvisP
    })
    try{
    prescription = await prescription.save()
    res.redirect(`/prescriptions/${prescription.id}`)
    }catch(e){
        res.render('prescriptions/new', { prescription: prescription})
    }
})

router.delete('/:id', async (req,res) => {
    try{
    await Prescription.findByIdAndDelete(req.params.id)
    res.redirect('/liste2/tout')
    }catch(e){
    res.redirect('/liste2/tout')
    }
})

router.put('/:id', async (req,res) => {
    let prescription = await Prescription.findById(req.params.id)
          prescription.ProtocA= req.body.ProtocA
          prescription.Surv= req.body.Surv
          prescription.Diag= req.body.Diag
          prescription.CIN=req.body.CIN
          prescription.aut = req.body.aut
          prescription.Sej = Number(req.body.Sej)
          prescription.Valid = req.body.Valid
          prescriptionAvisP = req.body.AvisP
    try{
    prescription = await prescription.save()
    res.redirect(`/prescriptions/${prescription.id}`)
    }catch(e){
        res.render('prescriptions/edit', { prescription: prescription})
    }
})

module.exports = router