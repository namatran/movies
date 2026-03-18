const express = require('express')
const db = require("../database.js")
const router = express.Router()

const createWatchlist = db.prepare('INSERT INTO watchlist (tmdb_id, title, overview, poster_path, rating, added_at) VALUES (?, ?, ?, ?, ?, ?)')
const getWatchlist = db.prepare('SELECT * FROM watchlist')
const deleteWatchlist = db.prepare('DELETE FROM watchlist WHERE id = ?')

router.post('/', (req, res) => {
    console.log(req.body);
    const { movieId, title, overview, poster_path, rating, added_at } = req.body
    if (!movieId) return res.status(400).json({ message: 'Movie is required' })

    createWatchlist.run(movieId, title, overview, poster_path, rating, added_at)
    
    res.status(201).json({ message: 'Movie added' })
})

router.get('/', (req, res) => {
    const watchlist = getWatchlist.all()
    res.json(watchlist)
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    const result = deleteWatchlist.run(id)

    if (result.changes > 0) {
        res.status(200).json({ message: 'Movie removed' })
    } else {
        res.status(404).json({ message: 'Movie not found' })
    }
})

module.exports = router