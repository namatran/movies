console.log(import.meta.env.VITE_API_URL);

import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/movies/popular`);
                if (!response.ok) {
                    throw new Error('Failed to fetch Movie data');
                }
                const data = await response.json();
                setResults(data);
            } catch (error) {
                setError(error.message);  
                console.error('Error fetching Movies:', error);
            } finally {
                setLoading(false)
            }
        };
        fetchPopular();
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            if (search === "") {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/movies/popular`);
                const data = await response.json();
                setResults(data);
                return;
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/movies/search?query=${search}`);
            if (!response.ok) throw new Error('Failed to fetch Movie data');
            const data = await response.json();
            setResults(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Welcome to Nam's Movie Lookup Site</h1>
            <p>Explore movies.</p>

            <div className="search-bar">
                <input 
                    placeholder="Search for movies..."
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className="movies-container">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : results.length === 0 ? (
                    <p className="no-results">No movies</p>
                ) : (
                    results.map((movie) => (
                        <Link to={`/movie/${movie.id}`} key={movie.id}>
                            <div className="movie-card">
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <h3>{movie.title}</h3>
                                <div>
                                    <p>{movie.release_date ? movie.release_date.slice(0, 4) : "Unknown"}</p>
                                    <p>⭐ {movie.vote_average}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>

        </div>
    );
}


export default Home;