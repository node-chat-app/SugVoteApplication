const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('User')

module.exports = function(passport){
passport.use(new LocalStrategy({usernameField: 'regNumber'},(regNumber, password, done) => {
User.findOne({
  password:password,
  regNumber:regNumber
}).then(user =>{
if(!user){
  return done(null, false, {message: 'No User found '});
}
else{
  return done(null, user);
}
})
}));

passport.serializeUser(function(user, done){
  done(null, user.id);
});
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});
}





// const LocalStrategy = require('passport-local').Strategy;
// const mongoose = require('mongoose');

// const User = mongoose.model('User')

// module.exports = function(passport){
// passport.use(new LocalStrategy({usernameField: 'number'},(number, password, done) => {
// User.findOne({
//   password:password,
//   number:number
// }).then(user =>{
// if(!user){
//   return done(null, false, {message: 'No User found '});
// }
// else{
//   return done(null, user);
// }
// })
// }));

// passport.serializeUser(function(user, done){
//   done(null, user.id);
// });
// passport.deserializeUser(function(id, done){
//   User.findById(id, function(err, user){
//     done(err, user);
//   });
// });
// }



