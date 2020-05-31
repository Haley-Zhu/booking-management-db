const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');
const logger = require('./utils/logger');
const connectToDB = require('./utils/database');

const PORT = process.env.PORT || 4000;
const app = express();
const morganLog = process.env.NODE_ENV === 'development' ? morgan('dev') : morgan('common');

app.use(helmet());
app.use(morganLog);
app.use(express.json());

app.use('/v1', routes);

connectToDB()
  .then(() => {
    logger.info("DB connected");
    app.listen(PORT, () => logger.info(`server is running on ${PORT}`));
  })
  .catch((e) => {
    logger.info("DB connection faild");
    logger.error(e.message);
    process.exit(1);
  });
