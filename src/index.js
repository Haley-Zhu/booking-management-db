const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');
const winston = require('winston');
const routes = require('./routes');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 4000;
const app = express();
const morganLog = process.env.NODE_ENV === 'development' ? morgan('dev') : morgan('common');

app.use(helmet());
app.use(morganLog);
app.use('/v1', routes);

app.listen(PORT, () => logger.info(`app run on port ${PORT}`));
