const nodemailer = require('nodemailer')

const sendVerificationEmail = async (email, verificationToken) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure the email service or SMTP details here
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  // Compose the email message
  const mailOptions = {
    from: 'khyal.com',
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

module.exports = sendVerificationEmail
