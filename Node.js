const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001;

// Allow cross-origin requests
app.use(cors());

// Connect to the MongoDB database
mongoose.connect('mongodb+srv://hvignesh69:Dante0994@cluster0.lvvuh3i.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define a schema for the merchants collection
const merchantSchema = new mongoose.Schema({
  'merchant-name': String,
  'merchant-id': String,
  'merchant-category': String
});

// Define a model for the merchants collection
const Merchant = mongoose.model('categorized_db', merchantSchema,'cat_collections');

// Define a route to get all merchants
app.get('/api/merchants', async (req, res) => {
  try {
    const merchants = await Merchant.find();
    console.log(merchants)
    res.send(merchants);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));