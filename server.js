require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 8000;
const Data = require("./Database.js");
const cors = require('cors')
const helmet = require('helmet')  

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting))

app.use(function validateMovieToken(req, res, next) {
  const authToken = req.get("Authorization").split(" ")[1];
  const apiToken = process.env.API_TOKEN

  if (!authToken || authToken !== apiToken) {
    return res.status(401).json({
      error: "Unauthorized request"
    })
  }

  next();
})

app.get("/movie", (req, res) => {
  const { genre, country, avg_vote } = req.query;

  let results = Data

  if (genre) {
    results = results.filter(movie =>
      movie.genre.toLowerCase().includes(genre.toLowerCase()))
      if(genre === "") {
        return res.status(400).send("Please enter a valid genre")
      }
  }

  if(country) {
    results = results.filter(movie =>
      movie.country.toLowerCase().includes(country.toLowerCase()))
      if(country === "") {
        return res.status(400).send("Please enter a valid country")
      }
  }

  if(req.query.avg_vote) {
    results = results.filter(movie => 
      movie.avg_vote >= avg_vote
      )
      if(isNaN(avg_vote)) {
        return res.status(400).send('Please enter a number between 1 and 10')
      }
      if(avg_vote >10 || avg_vote < 1) {
        return res.status(400).send('Please enter a number between 1 and 10')
      }
  }

  if(results.length === 0) {
    return res.status(204).send('No results found')
  }

  res.json(results)
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
