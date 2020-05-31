const express = require('express');
const userRoute = require('./routes/user');
const router = express.Router();

router.use('/users', userRoute);

module.exports = router;