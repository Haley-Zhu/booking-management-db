const Category = require("../models/category");

async function addCategory(req, res) {
  const { serviceName, description } = req.body;
  console.log('req.body: ', req.body);
  console.log('addCategory serviceName:', serviceName, 'description: ', description);

  const category = new Category({
    serviceName,
    description
  });
  console.log('category: ', category);
  await category.save();
  return res.json(category);
}

async function getCategoryById(req, res) {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return res.status(404).json("category is not found");
  }
  return res.json(category);
}

async function getAllCategories(req, res) {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~getAllCategories start');
  const { searchValue, searchField } = req.query;
  console.log('searchValue:', searchValue, 'searchField:', searchField)
  const categories = await Category.searchByFilter(searchValue, searchField);
  if (!categories) {
    return res.status(404).json("categories are not found");
  }
  return res.json(categories);
}

async function updateCategory(req, res) {
  const { id } = req.params;
  const { serviceName, description } = req.body;
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { serviceName, description },
    { new: true }
  );
  if (!updatedCategory) {
    return res.status(404).json("updating category failed");
  }
  return res.json(updatedCategory);
}

async function deleteCategoryById(req, res) {
  const { id } = req.params;
  const deletedCategory = await Category.findByIdAndDelete(id);
  if (!deletedCategory) {
    return res.status(404).json("deleting category failed");
  }
  return res.json(deletedCategory);
}

module.exports = {
  addCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategoryById,
};
