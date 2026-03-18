require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors'); // Optional: for handling CORS
const PORT = process.env.PORT || 3000;

const moviesRouter = require('./routes/movies');
const watchlistRouter = require('./routes/watchlist');

app.use(cors());
app.use(express.json());
app.use('/movies', moviesRouter);
app.use('/watchlist', watchlistRouter);

app.get('/ping', (req, res) => {
    res.json({ message: "ok" });
})  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});