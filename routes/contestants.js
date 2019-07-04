const express = require('express');
const router = express.Router();
const{ensureAuthenticated} = require('../helpers/auth');

const Vote = require('../model/vote');

const Contestants = require ('../model/cotestantsNames')

router.get('/George', ensureAuthenticated,(req, res) =>{
  Vote.find({
    sug:'George'
    }).sort({date:'desc'})
    .then(vote =>{

      Contestants.findOne({})
      .sort({date :'desc'})
      .then(Contestant =>{
        res.render('contestants/George', {
          first :Contestant.FirstContestant,
          vote: vote
        })
      })
     
    });
});

router.get('/pascal', ensureAuthenticated, (req, res) =>{
  Vote.find({
    sug:'Pascals'
    }).sort({date:'desc'})
    .then(vote =>{

      Contestants.findOne({})
      .sort({date :'desc'})
      .then(Contestant =>{
        res.render('contestants/pascal', {
          vote: vote,
          second : Contestant.SecondContestant
      })
     
      })
    });
});

router.get('/chijioke', ensureAuthenticated, (req, res) =>{
  Vote.find({
    sug:'Chijioke'
    }).sort({date:'desc'})
    .then(vote =>{
      Contestants.findOne({})
      .sort({date :'desc'})
      .then(Contestant =>{
        res.render('contestants/chijioke', {
          vote: vote,
          third : Contestant.ThirdContestant
        })
      })
      
    });
});

router.get('/esther', ensureAuthenticated, (req, res) =>{
  Vote.find({
  sug:'Esther'
  }).sort({date:'desc'})
  .then(vote =>{
    Contestants.findOne({})
    .sort({date :'desc'})
    .then(Contestant =>{
      res.render('contestants/esther', {
        vote: vote,
        fourth : Contestant.FourthContestant
      })
    })
    
    
  });
});

module.exports = router;