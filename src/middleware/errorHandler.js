const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
  console.log('test err', err);
  console.log('test err-------------------------------');
  console.log('test err message', err.message);
  console.log('test err message-------------------------------');
  if (err.name === "ValidationError") {
    return res.status(400).json(err.message);
  }
  logger.error(err);
  return res.status(500).json(err.message);
};
