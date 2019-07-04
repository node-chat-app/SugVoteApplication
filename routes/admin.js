const express = require ('express');
const router = express.Router();
const multer = require ('multer');
const fs = require ('fs');
const VoteDates = require('../model/voteDates')

const {ensureAuthenticated} = require ('../helpers/adminAuth');

const User = require('../model/user');

const Contestants = require('../model/cotestantsNames');

router.get('/', ensureAuthenticated,  (req, res) => {
  res.render('admin/admin');
});

//multer middleware
const storage = multer.diskStorage({
  destination : './public/img/',
  filename : function(req, file, cb){
    cb(null, file.originalname);
  }
});

//init mutter
const upload = multer({
   storage: storage,
  limits :{
   fileSize : 1000000
  }
}).single("my");

router.post('/mutter', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        res.render('admin/admin' )
      }else {
          res.redirect('/admin');
      }  
    })
})


router.post('/', (req, res)=>{
  if(req.user.isAdmin){
    User.findOne({regNumber : req.body.regNumber})
    .then(user =>{
  if(user){
    req.flash('error_msg', 'user already existed');
    res.redirect('/admin');
  }else{
    const newUser = new User({
      department :req.body.department,
      regNumber :req.body.regNumber,
      password :req.body.password,
      name:req.body.name
    })
    newUser.save().then(user =>{
      req.flash('success_msg',  'new voter with the registration number' + user.regNumber +  'added successfully');
      res.redirect('/admin');
     })
  }
    }).catch(err => {
      console.log(err);
    })
  }
  else{
    req.flash('error_msg', 'not authrised');
    res.redirect('/');
  }
})

router.get('/Users', ensureAuthenticated, (req, res) => {
  if(req.user.isAdmin){
    User.find({isAdmin : false})
    .sort({date :'desc'})
    .then(users =>{
        res.render('admin/users',{
        users : users
        });
    }).catch(error =>{
      console.log(error);
    });
  }else{
res.redirect('/');
  }
});

router.delete('/Users/delete/:id', (req, res) => {
  User.findOne({_id : req.params.id})
  .then(user =>{
  }).catch(err =>{
    console.log(err);
  });
  User.deleteOne({_id : req.params.id})
  .then(() =>{
    req.flash('success_msg', 'user delected')
    res.redirect('/admin/Users')
}).catch(err =>{
  console.log(err)
})
});

router.post('/getAUser', (req, res) =>{
  if (req.user.isAdmin = true){
    User.findOne({regNumber : req.body.regNumber })
  .then(user => {
    if(user){
      if(user.password ==req.body.password){
      res.render('admin/admin', {
        voter : user
      })  
    }else{
      req.flash('error_msg', ' reg number found but password mismatch')
      res.redirect('/admin')
    }
  }else{
    req.flash('error_msg', 'user not found');
    res.redirect('/admin')
  }
    

    }).catch(err =>{
   Console.log(err);
    })
  }else{
    res.redirect('/')
  }
   
})


router.post('/contestantsnames', (req, res) =>{
if(req.user.isAdmin){
  const newContestant = {
    FirstContestant: req.body.FirstContestant,
    SecondContestant:  req.body.SecondContestant,
    ThirdContestant: req.body.ThirdContestant,
    FourthContestant :  req.body.FourthContestant,
  }
  new Contestants(newContestant).save()
    req.flash('success_msg', 'names added');
    res.redirect('/admin');
}else{
  res.redirect('/');
}
})

router.post('/voteDates', (req, res) => {
  const newVoteDates = {
    votingDate: req.body.votingDate,
    closingDate:  req.body.closingDate
  }
  new VoteDates(newVoteDates).save();
req.flash('success_msg', 'successful');
res.redirect('/admin');
})

module.exports = router;