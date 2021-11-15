const mongoose = require('mongoose')

const Activity = mongoose.model('Activities', new mongoose.Schema({
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
  },
  type:{
    type: String
  }
}))

module.exports = Activity;