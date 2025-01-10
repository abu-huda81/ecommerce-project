const User = require('../models/user')
const crypto = require('crypto')
const sendVerificationEmail = require('../utils/emailVerificaation')
const jwt = require('jsonwebtoken')

// register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    // Check if the email is already registered
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      console.log('Email already registered:', email) // Debugging statement
      return res.status(400).json({ error: 'Email already registered' })
    }
    // Create a new user
    const newUser = new User({ name, email, password })
    // Generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString('hex')
    // Save the user to the database
    await newUser.save()
    // Debugging statement to verify data
    console.log('New User Registered:', newUser)
    // Send verification email to the user
    // Use your preferred email service or library to send the email
    await sendVerificationEmail(newUser.email, newUser.verificationToken)

    res.status(201).json({
      message:
        'User registered successfully, Please check your email for verification.',
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// verify email
const verifyEmailToken = async (req, res) => {
  try {
    const { token } = req.params.token
    //Find the user witht the given verification token
    const user = await User.findOne({ verificationToken: token })
    if (!user) {
      return res.status(404).json({ error: 'Invalid or expired token' })
    }
    //Mark the user as verified
    user.verified = true
    user.verificationToken = undefined
    await user.save()
    res.status(200).json({ message: 'Email verified successfully' })
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: 'Email Verification Failed!' })
  }
}

// login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    if (!user.verified) {
      return res.status(401).json({ error: 'Email not verified' })
    }
    //generate a token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
    res.status(200).json({ message: 'Login successful', token })
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Login Failed' })
  }
}

// add new address
const addAddress = async (req, res) => {
  try {
    const { userId, address } = req.body
    //find the user by the Userid
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    user.addresses.push(address)
    await user.save()
    res.status(200).json({ message: 'Address added successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error addding address' })
  }
}

// get all addresses
const getAddresses = async (req, res) => {
  try {
    const { userId } = req.params.userId
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const addresses = user.addresses
    res.status(200).json({ addresses })
  } catch (error) {
    res.status(500).json({ message: 'Error getting addresses' })
  }
}

// get user profile
const userProfile = async (req, res) => {
  try {
    const { userId } = req.params.userId
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the user profile' })
  }
}

module.exports = {
  registerUser,
  verifyEmailToken,
  loginUser,
  addAddress,
  getAddresses,
  userProfile,
}
