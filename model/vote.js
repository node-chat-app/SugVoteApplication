const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  sug: {
    type: String,
    required: true
  },
  points: {
    type: String,
    required: true
  },
  id:{
    type:Schema.Types.ObjectId,
    ref :'users'
  },
  date:{
    type:Date,
    default: Date.now
  },
  voterName:{
    type : String,
    required:true
  },
  voterDepartment:{
    type : String,
    required:true
  },
  voterRegnumber:{
    type : String,
    required:true
  }
});

const Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;