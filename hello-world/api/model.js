const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const Products = mongoose.Schema({
  name: {
    type: String,
    required: true,
    es_indexed: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    es_indexed: true
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

Products.plugin(mongoosastic, {
  host: "<ES-hostname-here>",
  port: "<ES-port-here>Number",
  protocol: "https",
  auth: "<ES-auth-details-here>"
});

const products = mongoose.model('Products', Products);

products.createMapping(err => {
  if (err) {
    console.error("Error creating mapping (You can safely ignore this):", err);
  }
});

module.exports = products
