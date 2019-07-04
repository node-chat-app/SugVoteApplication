const express = require ('express');
const router = express.Router();
const Pusher = require('pusher');
const mongoose = require ('mongoose');
const {ensureAuthenticated} = require ('../helpers/auth');

const VoteDates = require('../model/voteDates')

const Vote = require('../model/vote')

const User = require ('../model/user');

const Contestants = require ('../model/cotestantsNames');

var pusher = new Pusher({
  appId: '678261',
  key: '3f4d26e83aa58f641cd5',
  secret: '85bb3925afc1c87d6ab4',
  cluster: 'eu',
  useTLS: true
});

router.get('/result', (req, res) =>{
  Vote.find().then(votes => res.json({ success: true,
     Votes: votes}));
  });

// router.post('/mailer', (req, res) => {
//   const ouput = `<p> You have a message</p>
//   <h3> contact details</h3>
//   <ul>
//   <li> : ${req.body.name}</li>
//   <li> : ${req.body.department}</li>
//   <li> : ${req.body.password}</li>
//   <li> : ${req.body.regNumber}</li>
//   </ul>
//   `;
//   let transporter = nodemailer.createTransport({
//     // host : 'https://shrouded-escarpment-78977.herokuapp.com',
//     service : 'gmail',
//     port : 25,
//     secure : false,
//     auth:{
//       user : 'nwagbarag@gmail.com',
//       pass : 'george03'
//     },
//     tls :{
// rejectUnauthorized : false
//     }
//   })
 
// let HelperOptions = {
//   from : '"SugVote" <nwagbarag@gmail.com',
//   to: 'nwagbarag@gmail.com',
//   subject : 'nodemailer',
//   text : 'hello world',
//   html : ouput
// }

// transporter.sendMail(HelperOptions, (error, info) => {
//   if(error) {
//     console.log(error);
//   }
//   // console.log('mesage sent : %s', info.messageId);
//   // console.log ('preview URL: %s', nodemailer.getTestMessageUrl(info));
//   console.log(info)
//   res.render('vote', {

//     nodemailer_msg : 'email sent'
//   })
// })

// })

router.get('/', ensureAuthenticated, (req, res) => {
  VoteDates.findOne()
  .sort({date :'desc'})
  .then(date =>{
    var begin = new Date(date.votingDate);
    var end = new Date(date.closingDate);
  
     if( new Date() < begin ){
      res.render ('pre_vote')
    }
  
    else if(  begin <= new Date() && end > new Date() ){
      var today = new Date();
      var closingDate = end.getDate();
      var closingDateMonth = end.getMonth();
      var month = ["january", "february", "march", "aprail", "may", "june", "july", "august", "september", "october",
    "november", "november", "december"];
    var endMonth = month[closingDateMonth];
       var closingDateYear = end.getFullYear();
Vote.find()
.then(votes => {
  User.find({isAdmin : 'false'})
  .then(users => {
   Contestants.findOne()
   .sort({date :'desc'})
   .then(Contestant =>{
     res.render('vote', {
       votes : votes.length,
     users : users.length,
     leftVoter : users.length - votes.length,
     firstcontestants : Contestant.FirstContestant,
     secondcontestants : Contestant.SecondContestant,
     thirdcontestants : Contestant.ThirdContestant,
     fourthcontestants : Contestant.FourthContestant,


      daysleft : end.getDate() - today.getDate(),
       
 closingDate : closingDate,
 closingDateMonth : endMonth,
 closingDateYear : closingDateYear
     });
   })
  })
})    
    }
  
  
    else if( new Date()  >= end){

      Vote.find({sug : 'George'})
      .then(george =>{
        Vote.find({sug : 'Pascals'})
        .then(pascal =>{
          Vote.find({sug : 'Chijioke'})
          .then(chijioke =>{
            Vote.find({sug : 'Esther'})
            .then(esther =>{
              if(george.length > pascal.length && chijioke.length &&  esther.length) {
                var winner = 'George wins the election with';
                var winnerTotal = george.length + '  votes ' + 'congratulations George';
                       
              }else if(pascal.length > george.length && chijioke.length &&  esther.length){
                var winner = 'Pascal wins the election with';
                var winnerTotal = pascal.length + '  votes  congratulations Pascal';
  
              }else if(chijioke.length > george.length && pascal.length &&  esther.length){
                var winner = 'Chijioke wins the election with';
                var winnerTotal = chijioke.length + '  votes congratulations Chijioke';
  
              }else if(esther.length > george.length && pascal.length &&  chijioke.length){
                var winner = 'Esther wins the election with';
                var winnerTotal = esther.length + '  votes congratulations Esther';
              }   
              else{
                winner = '';
                var noWinnerYet = 'There was a draw in the poll so a winner has not emerged,';
                var shifted = 'the vote will be shifted to next week sunday';
              }           
               res.render('conclude', {
                  george :george,
                  pascal : pascal,
                  chijioke: chijioke,
                  esther : esther,
                  winner : winner,
                  total : winnerTotal,
                  noWinnerYet : noWinnerYet,
                  shifted : shifted
                       })
            })
          })
        })
      })
    }
  })
});



router.delete('/delete', (req, res) =>{
  Vote.findOne({id : req.user.id})
  .then(vote =>{
    if(vote){
      vote.remove()
      .then(() =>{
        req.flash('success_msg', 'vote delected')
        res.redirect('/vote')
      }).catch(err =>{
        console.log(err)
      })
    }else{
      res.redirect('/vote')
    }
  })
});

router.post('/', (req, res) => {
  let errors = [];
  if(req.body.sug == undefined){
    errors.push({text : 'choose a candidate'});
  } 
  if(req.user.isAdmin) {
    errors.push({text : 'Admin are not allowed to vote'});
  }
  if(errors.length  > 0 ){
    res.render('vote',{
errors : errors
    })
  }
  else{
    Vote.findOne({id : req.user.id})
        .then(vote => {
      if (!vote){
        const newVote = {
          sug: req.body.sug,
          points: 1,
          id:req.user.id,
          voterRegnumber : req.user.regNumber,
          voterName: req.user.name,
          voterDepartment : req.user.department
        }
        new Vote(newVote).save().then(vote =>{
          pusher.trigger('sug-poll', 'sug-vote', {
            points : parseInt(vote.points),
            sug : vote.sug
          });
          req.flash('success_msg',  'Thank you for voting')
          res.redirect('/vote');
          // return res.json({success: true, message: 'Thank you for voting'});
        })
      }
      else{
        req.flash('error_msg', 'you cannot vote twice')
        res.redirect('/vote');
      }
        })
        .catch(err => {
          console.log(err);
        })
       } 
});
module.exports = router;






































// router.post('/', (req, res) => {
//   if(req.body.sug == undefined){
// res.redirect('/vote')
//   }else{
//     if(req.user.isAdmin){
//       req.flash('error_msg', 'Admin are not allowed to vote sir');
//       res.redirect('/vote');
//     }
//     else{
//     Vote.findOne({id : req.user.id})
//     .then(vote => {
//   if (!vote){
//     const newVote = {
//       sug: req.body.sug,
//       points: 1,
//       id:req.user.id,
//       voterRegnumber : req.user.regNumber,
//       voterName: req.user.name,
//       voterDepartment : req.user.department
//     }
//     new Vote(newVote).save().then(vote =>{
//       pusher.trigger('sug-poll', 'sug-vote', {
//         points : parseInt(vote.points),
//         sug : vote.sug
//       });
//       req.flash('success_msg',  'Thank you for voting')
//       res.redirect('/vote');
//       // return res.json({success: true, message: 'Thank you for voting'});
//     });
//   }
//   else{
//     req.flash('error_msg', 'you have already voted before')
//     res.redirect('/vote');
//   }
//     })
//     .catch(err => {
//       console.log(err);
//     })
//    } 
//   }
  
// });