const express = require('express');
const {
  addCustomer,
  getCustomerById,
  getAllCustomers,
  updateCustomer,
  deleteCustomerById
} = require('../controllers/customer');
const router = express.Router();

router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);
router.post('/', addCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomerById);

module.exports = router;