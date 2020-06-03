const express = require('express');
const userRoute = require('./routes/user');
const businessRoute = require('./routes/business');
const categoryRoute = require('./routes/category');
const customerRoute = require('./routes/customer');
const orderRoute = require('./routes/order');
const authRoute = require('./routes/auth');
const router = express.Router();

router.use('/users', userRoute);
router.use('/businesses', businessRoute);
router.use('/categories', categoryRoute);
router.use('/customers', customerRoute);
router.use('/orders', orderRoute);
router.use('/auth', authRoute);

module.exports = router;