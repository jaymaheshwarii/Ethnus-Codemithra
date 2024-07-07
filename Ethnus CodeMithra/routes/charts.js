const express = require('express');
const Transaction = require('../models/Transaction');

const router = express.Router();

router.get('/bar', async (req, res) => {
  try {
    const { month } = req.query;
    const monthNumber = new Date(`${month} 1`).getMonth() + 1;

    const ranges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity }
    ];

    const result = await Transaction.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] }
        }
      },
      {
        $bucket: {
          groupBy: '$price',
          boundaries: ranges.map(r => r.min),
          default: 'Above 901',
          output: {
            count: { $sum: 1 }
          }
        }
      }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bar chart data' });
  }
});

router.get('/pie', async (req, res) => {
  try {
    const { month } = req.query;
    const monthNumber = new Date(`${month} 1`).getMonth() + 1;

    const result = await Transaction.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] }
        }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pie chart data' });
  }
});

module.exports = router;