const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// @route POST /api/orders
router.post('/', auth, async (req, res) => {
  try {
    const { restaurantName, restaurantEmoji, items, totalAmount, deliveryAddress } = req.body;

    const order = new Order({
      userId: req.user._id,
      restaurantName,
      restaurantEmoji,
      items,
      totalAmount,
      deliveryAddress: deliveryAddress || req.user.location
    });

    await order.save();

    res.status(201).json({
      message: 'Order placed successfully!',
      order
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route GET /api/orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route GET /api/orders/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;