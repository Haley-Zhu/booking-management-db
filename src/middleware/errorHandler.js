const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
      return res.status(400).json(err.message);
  }
  logger.error(err);
  return res.status(500).json(err);
}