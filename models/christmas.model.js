const mongoose = require('mongoose')

const Christmas = mongoose.model('Christmas', new mongoose.Schema({
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

module.exports = Christmas;
