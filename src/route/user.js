const express = require('express')
const multer  = require('multer')

const { createContact, getContact, getAllContact, updateContact, uploadProfileImage, deleteProfileImage, deleteContact } = require('../controllers/user')

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

router.post('/contact',createContact)

router.get('/contact',getContact)

router.get('/allContact',getAllContact)

router.put('/contact',updateContact)

router.post('/contact/profile',  upload.single('avatar'),uploadProfileImage)

router.delete('/contact/profile', deleteProfileImage)

router.delete('/contact',deleteContact)

module.exports = router