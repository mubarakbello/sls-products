const mongoose = require('mongoose');
const Products = require('./api/model');

const MONGOURL = process.env.MONGODB_URI || "";
mongoose.Promise = global.Promise;

mongoose.connect(MONGOURL, { useNewUrlParser: true }, err => {
  if (err) {
    console.error(`Error connecting to MongoDB:`, err.stack);
    console.log('Process exiting with code 1');
    process.exit(1);
  }
  console.log('Connected to DB successfully!');
});


exports.createProduct = async (event, context) => {
  const {
    name,
    price,
    description,
    sku,
    status
  } = JSON.parse(event.body);

  if (!name || !price || !description) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: true,
        message: "Incomplete parameters"
      })
    };
  }

  const newEntry = new Products({
    name, price, sku, status,
    description, createdAt: new Date()
  });

  try {
    const res = await newEntry.save();
    return {
      statusCode: 200,
      body: JSON.stringify({
        error: false,
        message: "Success!"
      })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: true,
        message: "Error saving product"
      })
    };
  }
}

exports.getProductById = async (event, context) => {
  const { id = "" } = event.pathParameters;

  try {
    const data = await Products.findById(id);
    return {
      statusCode: 200,
      body: JSON.stringify({
        error: false,
        message: `Successfully retrieved data for product with id: ${id}`,
        data
      })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: true,
        message: `Error retrieving product with id: ${id}`
      })
    };
  }
}

exports.getAllProducts = async (event, context) => {
  try {
    const data = await Products.find({});
    return {
      statusCode: 200,
      body: JSON.stringify({
        error: false,
        message: "Successfully retrieved all products data",
        data
      })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: true,
        message: "Error retrieving all products details"
      })
    };
  }
}

exports.updateProduct = async (event, context) => {
  const { id = "" } = event.pathParameters;
  const requestData = JSON.parse(event.body);

  try {
    const data = await Products.findByIdAndUpdate(id, requestData, { new: true });
    return {
      statusCode: 200,
      body: JSON.stringify({
        error: false,
        message: `Successfully updated data for product with id: ${id}`,
        data
      })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: true,
        message: `Error updating data for product with id: ${id}`
      })
    };
  }
}

exports.deleteProduct = async (event, context) => {
  const { id = "" } = event.pathParameters;

  try {
    await Products.findByIdAndRemove(id);
    return {
      statusCode: 200,
      body: JSON.stringify({
        error: false,
        message: `Successfully deleted data for product with id: ${id}`
      })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: true,
        message: `Error deleting data for product with id: ${id}`
      })
    };
  }
}
