const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// register
router.post('/register', userController.registerUser)

//endpoint to verify the email
router.get('/verify/:token', userController.verifyEmailToken)

// login
router.post('/login', userController.loginUser)

// add address
router.post('/add-address', userController.addAddress)

// get addresses
router.get('/addresses/:userId', userController.getAddresses)

// get user profile
router.get('/profile/:userId', userController.userProfile)

module.exports = router
