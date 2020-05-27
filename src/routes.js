const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
  res.send("use routes on 4000");
})

module.exports = router;