const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create user Schema
const ContestantsSchema = new Schema({
FirstContestant:{
    type:String,
    required:true
  },
  SecondContestant:{
    type:String,
    required:true
  },
  ThirdContestant:{
    type:String,
    required:true
  },
  FourthContestant:{
    type:String,
    required:true
  },
  date : {
    type : Date,
    default : Date.now
  }
});



const Contestants = mongoose.model('Contestants', ContestantsSchema);

module.exports = Contestants;

