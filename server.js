require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 8000;
const Data = require("./Database.js");
const cors = require('cors')
const helmet = require('helmet')  

app.use(morgan("dev"));



app.get("/movie", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
