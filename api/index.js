const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

require('colors')
dotenv.config()

const User = require('./models/user')

// routes importing:
const userRouter = require('./routers/userRouters')
const orderRouter = require('./routers/orderRouters')

const app = express()
const PORT = process.env.PORT || 8000
const MONGO_URI = process.env.MONGO_URI

// middlewares:
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes:
// app.use('/api/users', userRouter)
// app.use('/api/orders', orderRouter)

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

// ****************************************************************************

const sendVerificationEmail = async (email, verificationToken) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure the email service or SMTP details here
    service: 'gmail',
    auth: {
      user: 'dr.moh.t.askar@gmail.com',
      pass: 'kszkuoqbrjpkdaie',
    },
  })

  // Compose the email message
  const mailOptions = {
    from: 'amazon.com',
    to: email,
    subject: 'Email Verification',
    text: `Please click the following link to verify your email: http://localhost:8000/verify/${verificationToken}`,
  }

  // Send the email
  try {
    await transporter.sendMail(mailOptions)
    console.log('Verification email sent successfully')
  } catch (error) {
    console.error('Error sending verification email:', error)
  }
}
// Register a new user
// ... existing imports and setup ...

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if the email is already registered
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      console.log('Email already registered:', email) // Debugging statement
      return res.status(400).json({ message: 'Email already registered' })
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
    sendVerificationEmail(newUser.email, newUser.verificationToken)

    res.status(201).json({
      message:
        'Registration successful. Please check your email for verification.',
    })
  } catch (error) {
    console.log('Error during registration:', error) // Debugging statement
    res.status(500).json({ message: 'Registration failed' })
  }
})

//endpoint to verify the email
app.get('/verify/:token', async (req, res) => {
  try {
    const token = req.params.token

    //Find the user witht the given verification token
    const user = await User.findOne({ verificationToken: token })
    if (!user) {
      return res.status(404).json({ message: 'Invalid verification token' })
    }

    //Mark the user as verified
    user.verified = true
    user.verificationToken = undefined

    await user.save()

    res.status(200).json({ message: 'Email verified successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Email Verificatioion Failed' })
  }
})

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString('hex')

  return secretKey
}

const secretKey = generateSecretKey()

//endpoint to login the user!
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    //check if the user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    //check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    //check if the user is verified
    if (!user.verified) {
      return res.status(401).json({ message: 'Email not verified' })
    }

    //generate a token
    const token = jwt.sign({ userId: user._id }, secretKey)

    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Login Failed' })
  }
})

//endpoint to store a new address to the backend
app.post('/addresses', async (req, res) => {
  try {
    const { userId, address } = req.body

    //find the user by the Userid
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    //add the new address to the user's addresses array
    user.addresses.push(address)

    //save the updated user in te backend
    await user.save()

    res.status(200).json({ message: 'Address created Successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error addding address' })
  }
})

//endpoint to get all the addresses of a particular user
app.get('/addresses/:userId', async (req, res) => {
  try {
    const userId = req.params.userId

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const addresses = user.addresses
    res.status(200).json({ addresses })
  } catch (error) {
    res.status(500).json({ message: 'Error retrieveing the addresses' })
  }
})

//endpoint to store all the orders
app.post('/orders', async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    //create an array of product objects from the cart Items
    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item.quantity,
      price: item.price,
      image: item?.image,
    }))

    //create a new Order
    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    })

    await order.save()

    res.status(200).json({ message: 'Order created successfully!' })
  } catch (error) {
    console.log('error creating orders', error)
    res.status(500).json({ message: 'Error creating orders' })
  }
})

//get the user profile
app.get('/profile/:userId', async (req, res) => {
  try {
    const userId = req.params.userId

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the user profile' })
  }
})

app.get('/orders/:userId', async (req, res) => {
  try {
    const userId = req.params.userId

    const orders = await Order.find({ user: userId }).populate('user')

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' })
    }

    res.status(200).json({ orders })
  } catch (error) {
    res.status(500).json({ message: 'Error' })
  }
})
