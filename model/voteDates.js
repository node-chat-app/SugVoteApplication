const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create user Schema
const VoteDatesSchema = new Schema({
  votingDate:{
    type:String,
    required:true
  },
  closingDate:{
    type:String,
    required:true
  },
  date : {
    type : Date,
    default : Date.now
  }
});



const VoteDates = mongoose.model('VoteDates', VoteDatesSchema);

module.exports = VoteDates;

