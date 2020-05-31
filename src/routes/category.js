const express = require('express');
const {
  addCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategoryById
} = require('../controllers/category');
const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', addCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategoryById);

module.exports = router;