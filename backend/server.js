const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const config = require('./config/config');

const app = express();

// Middleware
app.use(cors()); 
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));