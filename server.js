require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 8000;
const Data = require("./Database.js");
const cors = require('cors')
const helmet = require('helmet')

app.use(morgan("dev"));
app.use(helmet())
app.use(cors())

app.use(function validateBearerToken(req, res, next) {
  const authToken = req.get("Authorization");
  console.log(authToken);
  const apiToken = process.env.API_TOKEN;

  if (!authToken || authToken !== apiToken) {
    return res.status(401).json({ error: "Unauthorized request" });
  }

  next();
});

app.get("/movie", (req, res) => {
  const { search = "", genre, country, avg_vote } = req.query;

  let results = Data.filter(movie =>
    movie.film_title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  if (genre) {
      results = results.filter(movie => 
        movie.genre.toLocaleLowerCase().includes(genre.toLocaleLowerCase()))
        if(results.length === 0) {
            return res.status(400).send('No results found under the genre you selected.')
        }
  }

  if (country) {
      results = results.filter(movie => 
        movie.country.toLocaleLowerCase().includes(country.toLocaleLowerCase()))
        if(results.length === 0) {
            return res.status(400).send('No results found under the country you selected.')
        }
  }

  if (avg_vote) {
      results = results.filter(movie =>
        Number(movie.avg_vote) >= Number(avg_vote))
        if(results.length === 0) {
            return res.status(400).send('No results found greater than the avg_vote you selected.')
        }
  }

  res.json(results)
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
