const express = require('express')
const router = express.Router()
const Article = require('./../models/article.js')
const ArticleLT = require('./../models/articleLT.js')
const ArticleCM = require('./../models/articleCM.js')
const ArticleFourn = require('./../models/articleFourn.js')
const ArticleRet = require('./../models/articleRet.js')
const userController = require('./../userController')
const f = require('./../UserRoles')
 
//router.post('/register', userController.register);
 
//router.post('/', userController.login);





/*router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);
 
router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);
 
router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);
 
router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);*/

module.exports = router;