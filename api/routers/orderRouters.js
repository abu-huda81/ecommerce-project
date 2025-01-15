const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')

// create order
router.post('/create-order', orderController.createOrder)

// get orders
router.get('/orders/:userId', orderController.getOrders)

module.exports = router
