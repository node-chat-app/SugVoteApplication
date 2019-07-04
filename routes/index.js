const express = require ('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose')
const {ensureAuthenticated} = require ('../helpers/auth')

//calling VoteDates model
const VoteDates = require('../model/voteDates')


//load user model
const User = require('../model/user');

router.get('/', (req,res) => {
  VoteDates.findOne()
  .sort({date :'desc'})
  .then(dates =>{
    if(dates){
      var begin = new Date(dates.votingDate);
      var electionYear = new Date();
      var year = electionYear.getFullYear();
      res.render( 'index',{
        votingDay : begin.getDate(),
        votingMonth : begin.getMonth() +1 ,
        votingYear : begin.getFullYear(),
    year : year
      });
    }else{
res.render('index');
    }
   
  })
    
 
  });

      router.post('/login', (req, res, next) => {
        passport.authenticate('local', {
          successRedirect:'/vote',
          failureRedirect:'/',
          failureFlash:true
        })(req, res, next);
        });

      router.get('/changePassword', ensureAuthenticated, (req, res) =>{
       res.render('changePassword');
      });

router.put('/changePassword', (req, res)=> {
User.findOne({_id : req.user.id})
.then(user =>{
  if(user.password == req.body.currentPassword){
        if(req.body.newPassword == req.body.confirmNewPassword){

           user.password = req.body.newPassword;

      user.save()
      .then(user =>{
        req.flash('success_msg', 'password successfully changed');
      res.redirect('/vote');
     })
     }else{
      req.flash('error_msg', 'your new password does not match');
  res.redirect('/changePassword');
}
  }else{
    req.flash('error_msg', 'wrong password');
    res.redirect('/changePassword');
  }
})
})

router.get('/logout', (req, res) =>{
  req.logout();
  res.redirect('/');
});
module.exports = router;