const User = require("../../models/user")
const sharp = require('sharp')

const createContact=async (req,res)=>{
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
}

const uploadProfileImage =  async (req, res) => {
  try {
    const buffer = await sharp(req.file.buffer).png().toBuffer()
    const user = await User.findOneAndUpdate({name : req.query.name},{avatar: buffer})

  await user.save()
  res.status(201).send(user)
} catch (error) {
    res.status(400).send(error)
}
}

const getContact=async(req,res)=>{
  try {
    const user = await User.findOne({name : req.query.name})
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
}

const getAllContact=async (req,res)=>{
  try {
    const user = await User.find().sort({name:1})
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
}

const updateContact=async(req,res)=>{
  try {
    const user = await User.findOneAndUpdate({name : req.query.name}, req.body, {new : true})
    await user.save()
    res.status(201).send(user)
  } catch (error) {
      res.status(400).send(error)
  }
}

const deleteContact=async(req,res)=>{
  try {
    const user = await User.findOneAndDelete({name : req.query.name}, {new : true})
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
}

const deleteProfileImage= async (req, res) => {
  try {
    const buffer = ""
    const user = await User.findOneAndUpdate({name : req.query.name}, {avatar: buffer}, {new : true})
   await user.save()
    res.status(200).send(user)
  } catch (error) {
      res.status(400).send(error)
  }
  res.send()
}

module.exports = {createContact, getContact, getAllContact, updateContact, deleteContact, uploadProfileImage, deleteProfileImage }