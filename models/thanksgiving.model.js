const mongoose = require('mongoose')

const Thanksgiving = mongoose.model('Thanksgiving', new mongoose.Schema({
  name:{
    type:String,
    required: true
  },
  description:{
    type:String,
    required: true
  },
  tags:{
    type:Array,
    required: true
  },
  time:{
    type:Number,
    required: true
  },
  supply:{
    type:String,
  }
}))

module.exports = Thanksgiving;

