const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create user Schema
const UserSchema = new Schema({
  department:{
    type:String,
    required:true
  },
  regNumber:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  isAdmin : {
    type : Boolean, default: false
  },
  date : {
    type : Date,
    default : Date.now
  }
});



const User = mongoose.model('User', UserSchema);

module.exports = User;

