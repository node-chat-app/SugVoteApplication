// if(process.env.NODE_ENV ==='production'){
//   module.exports = require('./keys_prod');
// } else{
//   module.exports = require ('./keys_dev');
// }





// const express = require ('express');
// const router = express.Router();
// const Pusher = require('pusher');
// const mongoose = require ('mongoose');

// const Vote = require('../model/vote')

// var pusher = new Pusher({
//   appId: '678261',
//   key: '3f4d26e83aa58f641cd5',
//   secret: '85bb3925afc1c87d6ab4',
//   cluster: 'eu',
//   useTLS: true
// });

// router.get('/result', (req, res) =>{
// Vote.find().then(votes => res.json({ success: true,
//    Votes: votes}));
// })

// router.get('/', (req, res) => {
//  res.render('vote')
// });

// router.post('/', (req, res) => {
  
  
// const newVote = {
//   sug: req.body.sug,
//   points: 1
// }
// new Vote(newVote).save().then(vote =>{

//   pusher.trigger('sug-poll', 'sug-vote', {
//     points : parseInt(vote.points),
//     sug : vote.sug
//   });
//   return res.json({success: true, message: 'Thank you for voting'});
// }) ;
// });

// module.exports = router;