const Customer = require("../models/customer");
const Order = require("../models/order");

async function addCustomer(req, res) {
  const { name, email, phone } = req.body;
  console.log('req.body: ', req.body);
  const customer = new Customer({
    name,
    email,
    phone,
  });
  await customer.save();
  return res.json(customer);
}

async function getCustomerById(req, res) {
  const { id } = req.params;
  const customer = await Customer.findById(id);
  if (!customer) {
    return res.status(404).json("customer is not found");
  }
  return res.json(customer);
}

async function getAllCustomers(req, res) {
  const { searchValue, searchField } = req.query;
  console.log('searchValue:', searchValue, 'searchField:', searchField)
  const customers = await Customer.searchByFilter(searchValue, searchField);
  if (!customers) {
    return res.status(404).json("customers are not found");
  }
  return res.json(customers);
}

async function updateCustomer(req, res) {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const updatedCustomer = await Customer.findByIdAndUpdate(
    id,
    { name, email, phone },
    { new: true }
  );
  if (!updatedCustomer) {
    return res.status(404).json("updating customer failed");
  }
  return res.json(updatedCustomer);
}

async function deleteCustomerById(req, res) {
  const { id } = req.params;
  const deletedCustomer = await Customer.findByIdAndDelete(id);
  if (!deletedCustomer) {
    return res.status(404).json("deleting customer failed");
  }
  return res.json(deletedCustomer);
}

async function addOrdertoCustomer(req, res) {
  const { customerId, orderId } = req.params;
  const existingCustomer = await Customer.findById(customerId);
  const existingOrder = await Order.findById(orderId);
  if (!existingCustomer || !existingOrder) {
    return res.status(404).json("Customer or Order is not found");
  }

  existingCustomer.orders.addToSet(existingOrder._id);
  await existingCustomer.save();
  return res.json(existingCustomer);
}

async function deleteOrdertoCustomer(req, res) {
  const { customerId, orderId } = req.params;
  const existingCustomer = await Customer.findById(customerId);
  const existingOrder = await Order.findById(orderId);
  if (!existingCustomer || !existingOrder) {
    return res.status(404).json("Customer or Order is not found");
  }
  existingCustomer.orders.pull(existingOrder._id);
  await existingCustomer.save();
  return res.json(existingCustomer);
}

module.exports = {
  addCustomer,
  getCustomerById,
  getAllCustomers,
  updateCustomer,
  deleteCustomerById,
  addOrdertoCustomer,
  deleteOrdertoCustomer,
};
