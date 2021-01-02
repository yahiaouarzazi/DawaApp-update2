const User = require('./models/user2.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
 
async function hashPassword(password) {
 return await bcrypt.hash(password, 10);
}
 
async function validatePassword(plainPassword, hashedPassword) {
 return await bcrypt.compare(plainPassword, hashedPassword);
}
 
exports.register = async (req, res, next) => {
 try {
  const hashedPassword = await hashPassword(req.body.password);
  const newUser = new User({
    name : req.body.name, 
    email : req.body.email, 
    password: hashedPassword, 
    role: req.body.role 
  });
  const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
   expiresIn: "1d"
  });
  newUser.accessToken = accessToken;
  await newUser.save();
  res.redirect('/')
 } catch (error) {
  res.redirect('/register') 
 }
}

exports.login = async (req, res, next) => {
    try {
     email = req.body.email;
     password = req.body.password;
     const user = await User.findOne({ email });
     if (!user) { res.render('articles/login', { AlerteAuth : " Email incorrect !" } ) }
     const validPassword = await validatePassword(password, user.password);
     if (!validPassword) { res.render('articles/login', { AlerteAuth : " Mot de passe incorrect !"} ) }
    
     const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
     });
     await User.findByIdAndUpdate(user._id, { accessToken })
     res.redirect('/Page') 
    } catch (error) {
      res.redirect('/') 
    }
   }

   /*exports.getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
     data: users
    });
   }
    
   exports.getUser = async (req, res, next) => {
    try {
     const userId = req.params.userId;
     const user = await User.findById(userId);
     if (!user) return next(new Error('User does not exist'));
      res.status(200).json({
      data: user
     });
    } catch (error) {
     next(error)
    }
   }
    
   exports.updateUser = async (req, res, next) => {
    try {
     const update = req.body
     const userId = req.params.userId;
     await User.findByIdAndUpdate(userId, update);
     const user = await User.findById(userId)
     res.status(200).json({
      data: user,
      message: 'User has been updated'
     });
    } catch (error) {
     next(error)
    }
   }
    
   exports.deleteUser = async (req, res, next) => {
    try {
     const userId = req.params.userId;
     await User.findByIdAndDelete(userId);
     res.status(200).json({
      data: null,
      message: 'User has been deleted'
     });
    } catch (error) {
     next(error)
    }
   }*/

   const { roles } = require('./roles')
 
exports.grantAccess = function(action, resource) {
 return async (req, res, next) => {
  try {
   const permission = roles.can(req.user.role)[action](resource);
   if (!permission.granted) {
    return res.status(401).json({
     error: "You don't have enough permission to perform this action"
    });
   }
   next()
  } catch (error) {
   next(error)
  }
 }
}
 
exports.allowIfLoggedin = async (req, res, next) => {
 try {
  const user = res.locals.loggedInUser;
  if (!user)
   return res.status(401).json({
    error: "You need to be logged in to access this route"
   });
   req.user = user;
   next();
  } catch (error) {
   next(error);
  }
}