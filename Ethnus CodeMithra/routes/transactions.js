const express = require('express');
const Transaction = require('../models/Transaction');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { month, search, page = 1, perPage = 10 } = req.query;
    const monthNumber = new Date(`${month} 1`).getMonth() + 1;

    let query = { $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] } };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { price: parseFloat(search) || 0 }
      ];
    }

    const total = await Transaction.countDocuments(query);
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));

    res.json({
      transactions,
      total,
      page: parseInt(page),
      perPage: parseInt(perPage),
      totalPages: Math.ceil(total / perPage)
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching transactions' });
  }
});

module.exports = router;