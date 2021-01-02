const express = require('express')
const router = express.Router()
const User = require('./../models/user.js')

router.get('/edit/:id', async (req,res) => {
    try{
    const user = await User.findById(req.params.id)
    res.render('users/edit', { user: user })
    }catch(e){
     res.redirect('/listeusers')   
    }
})

router.delete('/:id', async (req,res) => {
    try{
    await User.findByIdAndDelete(req.params.id)
    res.redirect('/listeusers')
    }catch(e){
    res.redirect('/listeusers')
    }
})

router.put('/:id', async (req,res) => {
    let user = await User.findById(req.params.id)
        user.name = req.body.name
        user.email = req.body.email
        user.role = req.body.role
    try{
    user = await user.save()
    res.redirect('/listeusers')
    }catch(e){
        res.render('users/edit', { user: user})
    }
})

module.exports = router