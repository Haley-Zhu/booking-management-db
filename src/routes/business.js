const express = require('express');
const {
  addBusiness,
  getBusinessById,
  getAllBusinesses,
  updateBusiness,
  deleteBusinessById,
  addCategorytoBusiness,
  deleteCategoryFromBusiness,
} = require('../controllers/business');
const router = express.Router();

router.get('/', getAllBusinesses);
router.get('/:id', getBusinessById);
router.post('/', addBusiness);
router.put('/:id', updateBusiness);
router.delete('/:id', deleteBusinessById);
router.post('/:businessId/categories/:categoryId', addCategorytoBusiness);
router.delete('/:businessId/categories/:categoryId', deleteCategoryFromBusiness);

module.exports = router;