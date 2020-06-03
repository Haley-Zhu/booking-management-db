const Order = require("../models/order");

async function addOrder(req, res) {
  const {
    status,
    orderEstimatedTime,
    orderFinishedTime,
    orderLocation,
    rate,
    comment,
  } = req.body;
  const order = new Order({
    status,
    orderEstimatedTime,
    orderFinishedTime,
    orderLocation,
    rate,
    comment,
  });
  if (!order) {
    return res.status(500).json("adding order failed");
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
  const orders = await Order.find();
  if (!orders) {
    return res.status(404).json("orders are not found");
  }
  return res.json(orders);
}

async function updateOrder(req, res) {
  const { id } = req.params;
  const {
    status,
    orderEstimatedTime,
    orderFinishedTime,
    orderLocation,
    rate,
    comment
  } = req.body;
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    {
      status,
      orderEstimatedTime,
      orderFinishedTime,
      orderLocation,
      rate,
      comment
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
  return res.json(deletedOrder);
}

module.exports = {
  addOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrderById,
};
