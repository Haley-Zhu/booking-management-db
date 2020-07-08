const mongoose = require('mongoose');

const connectToDB = () => {
  const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD, DB_DEV_HOST } = process.env;

  let connectionString;
  // if (DB_USER && DB_PASSWORD) {
  //   connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`;
  // }
  // else {
    connectionString = `mongodb://${DB_DEV_HOST}:${DB_PORT}/${DB_DATABASE}`;
  // }

  console.log(`Connecting to ${connectionString}`);
  mongoose.set('useFindAndModify', false);
  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
};

module.exports = connectToDB;