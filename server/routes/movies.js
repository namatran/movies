const express = require('express')
const db = require("../database.js")
const router = express.Router()

router.get("/search", async (req, res, next) => {
  try {
    const { query } = req.query;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await response.json();
    res.json(data.results);
  } catch (err) { 
    next(err);
  }
});

router.get("/popular", async (req, res, next) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await response.json();
    res.json(data.results);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    next(err);
  }
}); 


module.exports = router