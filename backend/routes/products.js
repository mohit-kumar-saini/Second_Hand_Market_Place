const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');


router.get('/', async (req, res) => {
  try {
    const { category } = req.query; 
    const query = category ? { category: new RegExp(category, 'i') } : {}; 

    const products = await Product.find(query); 
    const randomProducts = products.sort(() => 0.5 - Math.random());
    res.json(randomProducts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});


router.post('/create', async (req, res) => {
  console.log("🔍 Incoming request:", req.body);

  const { title, description, price, category, condition, imageUrl } = req.body;

  if (!title || !description || !price || !category || !condition || !imageUrl) {
    return res.status(400).json({ msg: 'Missing required fields' });
  }

  try {
    const newProduct = new Product({
      title,
      description,
      price,
      category,
      condition,
      imageUrl
    });

    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("❌ Error saving product:", err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});


router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category'); 
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});


module.exports = router;
