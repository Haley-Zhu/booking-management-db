const express = require('express');
const {
  addOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrderById
} = require('../controllers/order');
const router = express.Router();

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.post('/', addOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrderById);

module.exports = router;