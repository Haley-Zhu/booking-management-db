const express = require("express");
require('dotenv').config();
const routes = require("./routes");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(routes);

app.listen(PORT, () => console.log(`app run on port ${PORT}`));