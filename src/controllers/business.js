const Business = require("../models/business");
const Category = require("../models/category");

async function addBusiness(req, res) {
  const {
    name,
    ABN,
    email,
    phone,
    streeAddress,
    postcode,
    state,
    rate,
  } = req.body;
  const existingEmail = await Business.findOne({ email });
  if (existingEmail) {
    return res.status(400).json("email has already existed");
  }
  const business = new Business({
    name,
    ABN,
    email,
    phone,
    streeAddress,
    postcode,
    state,
    rate,
  });
  await business.save();
  return res.json(business);
}

async function getBusinessById(req, res) {
  const { id } = req.params;
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~getBusinessById start:", id);
  const business = await Business.findById(id);

  if (!business) {
    res.status(404).json("business is not found");
  }
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~getBusinessById end:", business);
  return res.json(business);
}

async function getAllBusinesses(req, res) {
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~getAllBusinesses start");
  const { searchValue, searchField } = req.query;
  console.log("searchValue:", searchValue, "searchField:", searchField);
  const businesses = await Business.searchByFilter(searchValue, searchField);
  if (!businesses) {
    return res.status(404).json("businesses are not found");
  }
  return res.json(businesses);
}

async function updateBusiness(req, res) {
  const { id } = req.params;
  const {
    name,
    ABN,
    email,
    phone,
    streeAddress,
    postcode,
    state,
    rate,
  } = req.body;
  const updatedBusiness = await Business.findByIdAndUpdate(
    id,
    { name, ABN, email, phone, streeAddress, postcode, state, rate },
    { runValidators: true, new: true }
  );
  if (!updatedBusiness) {
    return res.status(404).json("business is not found");
  }
  console.log("@@@@@@@@@@@", updatedBusiness);
  return res.json(updatedBusiness);
}

async function deleteBusinessById(req, res) {
  const { id } = req.params;
  const deletedBusiness = await Business.findByIdAndDelete(id);
  if (!deletedBusiness) {
    return res.status(404).json("business is not found");
  }
  await Category.updateMany(
    { _id: { $in: deletedBusiness.categories } },
    { $pull: { businesses: deletedBusiness._id } }
  );
  return res.json(deletedBusiness);
}

// POST /api/business/:businessId/Category/:categoryId
async function addCategorytoBusiness(req, res) {
  const { businessId, categoryId } = req.params;
  const existingBusiness = await Business.findById(businessId);
  const existingCategory = await Category.findById(categoryId);
  if (!existingBusiness || !existingCategory) {
    return res.status(404).json("Business or category is not found");
  }

  existingBusiness.categories.addToSet(existingCategory._id);
  await existingBusiness.save();
  existingCategory.businesses.addToSet(existingBusiness._id);
  await existingCategory.save();
  return res.json(existingBusiness);
}

async function deleteCategoryFromBusiness(req, res) {
  const { businessId, categoryId } = req.params;
  const existingBusiness = await Business.findById(businessId);
  const existingCategory = await Category.findById(categoryId);
  if (!existingBusiness || !existingCategory) {
    return res.status(404).json("Business or category is not found");
  }

  existingBusiness.categories.pull(existingCategory._id);
  await existingBusiness.save();
  existingCategory.businesses.pull(existingBusiness._id);
  await existingCategory.save();
  return res.json(existingBusiness);
}

async function getBusinessListByCategoryId(req, res) {
  const { categoryId } = req.params;
  const businessList = await Business.find({categories: { $in: categoryId}});
  if (!businessList) {
    return res.status(404).json("business is not found");
  }
  return res.json(businessList);  
}

module.exports = {
  addBusiness,
  getBusinessById,
  getAllBusinesses,
  updateBusiness,
  deleteBusinessById,
  addCategorytoBusiness,
  deleteCategoryFromBusiness,
  getBusinessListByCategoryId,
};
