require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 8000;
const Data = require("./Database.js");
const cors = require('cors')
const helmet = require('helmet')  

app.use(morgan("dev"));

app.use(function validateMovieToken(req, res, next) {
  const authToken = req.get("Authorization")
  const apiToken = process.env.API_TOKEN

  if (!authToken || authToken !== apiToken) {
    return res.status(401).json({
      error: "Unauthorized request"
    })
  }

  next();
})

app.get("/movie", (req, res) => {
  return res.status(200).send('Success never tasted so sweet.')
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
