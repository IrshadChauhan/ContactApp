const express = require('express')
const User = require('../models/user.js')

const router =  express.Router()

router.post('/contact',async (req,res)=>{
  try {
  const user = new User(req.body)
    await user.save()
    res.status(201).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/contact',async(req,res)=>{
  try {
    const user = await User.findOne({name : req.query.name})
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/allContact',async (req,res)=>{
  try {
    const user = await User.find()
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.put('/contact',async(req,res)=>{
  try {
    const user = await User.findOneAndUpdate({name : req.query.name}, req.body, {new : true})
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete('/contact',async(req,res)=>{
  try {
    const user = await User.findOneAndDelete({name : req.query.name}, {new : true})
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router