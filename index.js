const express = require("express")
const mongoose = require('mongoose');
require('./src/db/db.js')
require('dotenv').config()

const app = express()
const userRoute = require('./src/route/user')

app.use(express.json())
app.use(userRoute)

app.get("/",(req,res)=>{
  res.send("hello")
})

app.listen(process.env.PORT, ()=>{
  console.log("running server");
})