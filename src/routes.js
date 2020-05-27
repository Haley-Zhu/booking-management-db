const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
  res.send("use routes");
})

module.exports = router;