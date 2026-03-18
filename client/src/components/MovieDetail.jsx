import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetail.css';


const MovieDetail = () => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [inWatchlist, setInWatchlist] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/movies/${id}`);
                const data = await response.json();
                setMovie(data);

                const watchlistRes = await fetch(`${import.meta.env.VITE_API_URL}/watchlist`);
                const watchlistData = await watchlistRes.json();
                setInWatchlist(watchlistData.some(m => m.tmdb_id === data.id));
            } catch (error) {
                setError(error.message);  
                console.error('Error fetching Movie:', error);
            } finally {
                setLoading(false)
            }
        };
        fetchMovie();
    }, []);

    // Watchlist Functions
    const handleAddToWatchlist = async () => {
        await fetch(`${import.meta.env.VITE_API_URL}/watchlist`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                movieId: movie.id,
                title: movie.title,
                overview: movie.overview,
                poster_path: movie.poster_path,
                rating: movie.vote_average,
                added_at: new Date().toISOString()
            })
        });
        setInWatchlist(true)
    };

    const handleRemoveFromWatchlist = async () => {
        const watchlistRes = await fetch(`${import.meta.env.VITE_API_URL}/watchlist`);
        const watchlistData = await watchlistRes.json();
        const entry = watchlistData.find(m => m.tmdb_id === movie.id);
        await fetch(`${import.meta.env.VITE_API_URL}/watchlist/${entry.id}`, { method: 'DELETE' });
        setInWatchlist(false);
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div className="movie-container">
                    <h1 className="title">{movie.title}</h1>
                    <div className="info">
                        <p>{movie.release_date ? movie.release_date.slice(0, 4) : "Unknown"}</p>
                        <p>{movie.vote_average}</p>
                        {movie.runtime ? <p>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</p> : null}
                    </div>
                    <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                    />
                    <div className="genres">
                        {movie.genres.map(genre => (
                            <span key={genre.id} className="genre-tag">{genre.name}</span>
                        ))}
                    </div>
                    <p>{movie.overview}</p>
                    <button onClick={inWatchlist ? handleRemoveFromWatchlist : handleAddToWatchlist}>
                        {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                    </button>
                </div>
            )}
        </div>
    );
}


export default MovieDetail;
