const express = require('express');
const {
  addBusiness,
  getBusinessById,
  getAllBusinesses,
  updateBusiness,
  deleteBusinessById
} = require('../controllers/business');
const router = express.Router();

router.get('/', getAllBusinesses);
router.get('/:id', getBusinessById);
router.post('/', addBusiness);
router.put('/:id', updateBusiness);
router.delete('/:id', deleteBusinessById);

module.exports = router;