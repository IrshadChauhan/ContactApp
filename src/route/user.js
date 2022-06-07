const express = require('express')
const multer  = require('multer')
const sharp = require('sharp')

const User = require('../models/user.js')

const router =  express.Router()

const upload = multer({
  limits: {
      fileSize: 100000000
  },
  fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new Error('Please upload an image'))
      }

      cb(undefined, true)
  }
})

router.post('/contact',async (req,res)=>{
  try {
    const name = req.body.name
    const phonenumber = req.body.phonenumber
    const otherphonenumber = req.body.otherphonenumber
    const email = req.body.email
    
  const user = new User({name, phonenumber, otherphonenumber, email})
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
    const user = await User.find().sort({name:1})
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.put('/contact',async(req,res)=>{
  try {
    const user = await User.findOneAndUpdate({name : req.query.name}, req.body, {new : true})
    await user.save()
    res.status(201).send(user)
  } catch (error) {
      res.status(400).send(error)
  }
})

router.post('/contact/profile',  upload.single('avatar'), async (req, res) => {
  try {
    const buffer = await sharp(req.file.buffer).png().toBuffer()
    const user = await User.findOneAndUpdate({name : req.query.name},{avatar: buffer})

  await user.save()
  res.status(201).send(user)
} catch (error) {
    res.status(400).send(error)
}
})

router.delete('/contact/profile',  async (req, res) => {
  try {
    const buffer = ""
    const user = await User.findOneAndUpdate({name : req.query.name}, {avatar: buffer}, {new : true})
   await user.save()
    res.status(200).send(user)
  } catch (error) {
      res.status(400).send(error)
  }
  res.send()
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