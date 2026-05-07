const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  name: String,
  emoji: String,
  price: Number,
  qty: Number
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurantName: {
    type: String,
    required: true
  },
  restaurantEmoji: {
    type: String,
    default: '🍽️'
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  deliveryAddress: {
    type: String,
    default: 'Mysuru'
  },
  status: {
    type: String,
    enum: ['placed', 'preparing', 'on_the_way', 'delivered'],
    default: 'placed'
  },
  estimatedTime: {
    type: String,
    default: '30-40 mins'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);