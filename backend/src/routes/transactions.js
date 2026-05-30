const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  create, getAll, update, remove,
  getMonthlySummary, getDashboardSummary
} = require('../controllers/transactionController');

router.post('/', auth, create);
router.get('/', auth, getAll);
router.put('/:id', auth, update);
router.delete('/:id', auth, remove);
router.get('/summary/monthly', auth, getMonthlySummary);
router.get('/summary/dashboard', auth, getDashboardSummary);

module.exports = router;

