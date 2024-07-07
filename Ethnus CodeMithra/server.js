const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/statistics', require('./routes/statistics'));
app.use('/api/charts', require('./routes/charts'));
app.use('/api/combined', require('./routes/combined'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});