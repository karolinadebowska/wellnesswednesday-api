const express = require('express');
const router = express.Router();
const Activity = require('../models/activity.model')
const Calendar = require('../models/calendar.model')

router.get('/christmas', async (req, res) => {
  try{
    const christmas_activities = await Activity.find({type: 'christmas'})
    res.json(christmas_activities);
  }
  catch (err){
    res.status(500).json({message:err.message})
  }
})

router.get('/thanksgiving', async (req, res) => {
  try{
    const thanksgiving_activities = await Activity.find({type: 'thanksgiving'})
    res.json(thanksgiving_activities);
  }
  catch (err){
    res.status(500).json({message:err.message})
  }
})

router.get('/calendar', async (req, res) => {
  try{
    const calendar_events = await Calendar.find()
    res.json(calendar_events);
  }
  catch (err){
    res.status(500).json({message:err.message})
  }
})

router.get('/', async (req, res) => {
  try{
    const activities = await Activity.find({ type: 'standard'})
    res.json(activities);
  }
  catch (err){
    res.status(500).json({message:err.message})
  }
})

router.get('/name/:name', async (req, res) => {
  try{
    const arr = req.params.name.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const nameToUpper = arr.join(" ");
    const activities = await Activity.find({ type: 'standard', $or: [ { name: { $regex: req.params.name } }, {name: { $regex: nameToUpper }}] })
    res.json(activities);
  }
  catch (err){
    res.status(500).json({message:err.message})
  }
})

router.get('/description/:name', async (req, res) => {
  try{
    const arr = req.params.name.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const nameToUpper = arr.join(" ");
    const activities = await Activity.find({ type: 'standard', $or: [ { description: { $regex: req.params.name } }, {description: { $regex: nameToUpper }}] })
    res.json(activities);
  }
  catch (err){
    res.status(500).json({message:err.message})
  }
})

router.get('/:supply/:time/:tags', async (req, res) => {
  try{
  let activities; 
  var obj = JSON.parse(decodeURIComponent(req.params.tags));
  let myArray = new Array();    
  for(var i in obj)
    myArray.push(obj[i]);
  if (req.params.supply==='none'){
    if (req.params.time==='90')
      activities = await Activity.find({ type: 'standard', supply: '' , time: { $gte: req.params.time}, tags: { $all: myArray } })
    else if (req.params.time==='0')
      activities = await Activity.find({ type: 'standard', supply: '' , tags: { $all: myArray } })
    else
      activities = await Activity.find({ type: 'standard', supply: '' , time: req.params.time, tags: { $all: myArray } })
  }
  else if (req.params.supply==='supply'){
    if (req.params.time==='90')
      activities = await Activity.find({ type: 'standard', supply: { $ne: ''} , time: { $gte: req.params.time}, tags: { $all: myArray } })
    else if (req.params.time==='0')
      activities = await Activity.find({ type: 'standard', supply: { $ne: ''} , tags: { $all: myArray } })
    else
      activities = await Activity.find({ type: 'standard', supply: { $ne: ''} , time: req.params.time, tags: { $all: myArray } })
  }
  else{
    if (req.params.time==='90')
      activities = await Activity.find({type: 'standard', time: { $gte: req.params.time}, tags: { $all: myArray } })
    else if (req.params.time==='0')
      activities = await Activity.find({type: 'standard', tags: { $all: myArray } })
    else
      activities = await Activity.find({type: 'standard', time: req.params.time, tags: { $all: myArray } })
  }
  res.json(activities);
  }
  catch (err){
    res.status(500).json({message:err.message})
  }
})

router.get('/:supply/:time', async (req, res) => {
  try{
    let activities; 
    if (req.params.supply==='none'){
      if (req.params.time==='90')
        activities = await Activity.find({type: 'standard', supply: '' , time: { $gte: req.params.time}})
      else if (req.params.time==='0')
        activities = await Activity.find({ type: 'standard', supply: '' })
      else
        activities = await Activity.find({ type: 'standard', supply: '' , time: req.params.time})
    }
    else if (req.params.supply==='supply'){
      if (req.params.time==='90')
        activities = await Activity.find({ type: 'standard', supply: { $ne: ''} , time: { $gte: req.params.time}})
      else if (req.params.time==='0')
        activities = await Activity.find({ type: 'standard', supply: { $ne: ''}})
      else
        activities = await Activity.find({ type: 'standard', supply: { $ne: ''} , time: req.params.time})
    }
    else {
      if (req.params.time==='90')
        activities = await Activity.find({type: 'standard', time: { $gte: req.params.time}})
      else if (req.params.time==='0')
        activities = await Activity.find({type: 'standard'})
      else
        activities = await Activity.find({type: 'standard', time: req.params.time})
    }
    res.json(activities);
  }
  catch (err){
    res.status(500).json({message:err.message})
  }
})

module.exports = router