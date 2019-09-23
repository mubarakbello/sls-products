const mongoose = require('mongoose');

const Products = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  sku: {
    type: Number,
    default: 1
  },
  status: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Products', Products);
