const Order = require("../models/order");
const Customer = require("../models/customer");
const Business = require("../models/business");
const Category = require("../models/category");

async function addOrder(req, res) {
  const {
    customer,
    business,
    category,
    status,
    orderEstimatedTime,
    orderFinishedTime,
    orderLocation,
    rate,
    comment,
  } = req.body;
  const order = new Order({
    customer,
    business,
    category,
    status,
    orderEstimatedTime,
    orderFinishedTime,
    orderLocation,
    rate,
    comment,
  });
  const existingCustomer = await Customer.findOne({ _id: customer });
  if (!existingCustomer) {
    return res.status(404).json(`Customer is not found`);
  }

  const existingCategory = await Category.findOne({ _id: category });
  if (!existingCategory) {
    return res.status(404).json(`Category is not found`);
  }

  const existingBusiness = await Business.findOne({ _id: business });
  if (!existingBusiness) {
    return res.status(404).json(`Business is not found`);
  }

  await order.save();
  return res.json(order);
}

async function getOrderById(req, res) {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json("order is not found");
  }
  return res.json(order);
}

async function getAllOrders(req, res) {
  const { searchValue, searchField } = req.query;
  console.log('searchValue:', searchValue, 'searchField:', searchField)
  const orders = await Order.find()
  .populate('customer', 'name')
  .populate('business', 'name')
  .populate('category', 'serviceName');
  // const orders = await Order.searchByFilter(searchValue, searchField);
  if (!orders) {
    return res.status(404).json("orders are not found");
  }
  return res.json(orders);
}

async function updateOrder(req, res) {
  const { id } = req.params;
  const {
    customer,
    business,
    category,
    status,
    orderEstimatedTime,
    orderFinishedTime,
    orderLocation,
    rate,
    comment,
  } = req.body;
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    {
      customer,
      business,
      category,
      status,
      orderEstimatedTime,
      orderFinishedTime,
      orderLocation,
      rate,
      comment,
    },
    { runValidators: true, new: true }
  );
  if (!updatedOrder) {
    return res.status(404).json("updating order failed");
  }
  return res.json(updatedOrder);
}

async function deleteOrderById(req, res) {
  const { id } = req.params;
  const deletedOrder = await Order.findByIdAndDelete(id);
  if (!deletedOrder) {
    return res.status(404).json("order is not found");
  }
  await Customer.updateMany(
    { _id: { $in: deletedOrder.customer } },
    { $pull: { orders: deletedOrder._id } }
  );
  return res.json(deletedOrder);
}

module.exports = {
  addOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrderById,
};
