const express = require('express');
const Transaction = require('../models/Transaction');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { month } = req.query;
    const monthNumber = new Date(`${month} 1`).getMonth() + 1;

    const stats = await Transaction.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] }
        }
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: { $cond: [{ $eq: ['$sold', true] }, '$price', 0] } },
          totalSoldItems: { $sum: { $cond: [{ $eq: ['$sold', true] }, 1, 0] } },
          totalNotSoldItems: { $sum: { $cond: [{ $eq: ['$sold', false] }, 1, 0] } }
        }
      }
    ]);

    res.json(stats[0] || { totalSaleAmount: 0, totalSoldItems: 0, totalNotSoldItems: 0 });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching statistics' });
  }
});

module.exports = router;