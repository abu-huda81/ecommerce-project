const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
require('colors')
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000
const MONGO_URI = process.env.MONGO_URI

// middlewares:
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes:

app.get('/', (req, res) => {
  res.send('hello world')
})

// database connection:
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(
      `connected to database successfully...`.bgBlue.white.bold.italic
    )
  })
  .catch((err) => {
    console.log(err, 'database connection error...'.bgMagenta.white.bold.italic)
  })

// listen:
app.listen(PORT, () => {
  console.log(
    `server is running on: http://localhost:${PORT}`.bgCyan.white.bold.italic
  )
})
