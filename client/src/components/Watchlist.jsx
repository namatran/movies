import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Watchlist.css';

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const response = await fetch('http://localhost:3000/watchlist/');
                const data = await response.json();
                setWatchlist(data);
            } catch (error) {
                setError(error.message);  
                console.error('Error fetching Watchlist:', error);
            } finally {
                setLoading(false)
            }
        };
        fetchWatchlist();
    }, []);

    return (
        <div>
            <h1>Watchlist</h1>
            <div className="movies-container"> 
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : watchlist.length === 0 ? (
                    <p className="no-results">No movies</p>
                ) : (
                    watchlist.map((movie) => (
                        <Link to={`/movie/${movie.tmdb_id}`} key={movie.id}>
                            <div className="movie-card">
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <h3>{movie.title}</h3>
                                <div>
                                    <p>{movie.added_at ? movie.added_at.slice(0, 4) : "Unknown"}</p>
                                    <p>⭐ {movie.rating}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}

export default Watchlist;
