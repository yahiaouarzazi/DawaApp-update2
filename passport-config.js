const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User3 = require('./models/user3.js')
const User = require('./models/user.js')

function initialize(passport){
  const authenticateUser = async (email, password, done) =>{
     const user = await User.findOne({email: email})
     if(user == null){
         return done(null, false, { message: 'Email incorrect'})
     }
     try{
         if(await bcrypt.compare(password, user.password)){
            let user3 = new User3({
                name: user.name,
                email: user.email,
                role: user.role
            })
            user3 = await user3.save()
            console.log(user3.name)
            return done(null, user)
         }else{
             return done(null, false, { message: 'Mot de passe incorrect'})
         }
     } catch(e) {
         return done(e)
     }
  }
  passport.use(new LocalStrategy({ usernameField: 'email'},
  authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, async () => {
      await  User.findById(id)  })
  })
}

module.exports = initialize