const express = require("express");

const app = express();

app.get('/', (req, res) => {
  res.send('test 1');
})

app.listen(3000, () => console.log("app run on port 3000"));