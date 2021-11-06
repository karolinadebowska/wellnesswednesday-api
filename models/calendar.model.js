const mongoose = require('mongoose')

const Calendar = mongoose.model('Calendar', new mongoose.Schema({
  name:{
    type:String,
    required: true
  },
  date:{
    type:String,
    required: true
  }
}))

module.exports = Calendar;

