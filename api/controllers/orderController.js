const User = require('../models/user')
const Order = require('../models/order')

// create order:
const createOrder = async (req, res) => {
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

    //save the order
    await order.save()

    res.status(201).json({ message: 'Order created successfully' })
  } catch (error) {
    console.log('error creating orders', error)
    res.status(500).json({ message: 'Error creating orders' })
  }
}

// get all orders of a user:
const getOrders = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const orders = await Order.find({ user: userId })
    res.status(200).json({ orders })
  } catch (error) {
    res.status(500).json({ message: 'Error getting orders' })
  }
}

module.exports = { createOrder,  getOrders}
