const express = require('express');
const {
  addCustomer,
  getCustomerById,
  getAllCustomers,
  updateCustomer,
  deleteCustomerById,
  addOrdertoCustomer,
  deleteOrdertoCustomer,
} = require('../controllers/customer');
const router = express.Router();

router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);
router.post('/', addCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomerById);
router.post('/:customerId/orders/:orderId', addOrdertoCustomer);
router.delete('/:customerId/orders/:orderId', deleteOrdertoCustomer);

module.exports = router;