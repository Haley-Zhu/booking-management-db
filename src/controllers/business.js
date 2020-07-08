const Business = require("../models/business");

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
  const business = await Business.findById(id);

  if (!business) {
    res.status(404).json("business is not found");
  }
  return res.json(business);
}

async function getAllBusinesses(req, res) {
  const businesses = await Business.find();
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
  return res.json(updatedBusiness);
}

async function deleteBusinessById(req, res) {
  const { id } = req.params;
  const deletedBusiness = await Business.findByIdAndDelete(id);
  if (!deletedBusiness) {
    return res.status(404).json("business is not found");
  }
  return res.json(deletedBusiness);
}

module.exports = {
  addBusiness,
  getBusinessById,
  getAllBusinesses,
  updateBusiness,
  deleteBusinessById,
};
