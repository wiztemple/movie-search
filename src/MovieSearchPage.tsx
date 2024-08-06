import React, { useState } from 'react';
import useMovieSearch from './hooks/useMovieSearch';
import './MovieSearchPage.css';

const DEFAULT_IMAGE = 'image.png';

const MovieSearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const { movies, isLoading, isError, searchMovies } = useMovieSearch();

  const handleSearch = () => {
    searchMovies(query);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container">
      <h1 className="title">Movie Search</h1>
      <div className="search-bar">
        <input
          type="text"
          className="input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a movie..."
        />
        <button onClick={handleSearch} className="button">Search</button>
      </div>
      {isLoading && <p className="flex">Loading...</p>}
      {isError && <p>Error loading data</p>}
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie">
            <div className="movie-images">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
                className="movie-poster"
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_IMAGE;
                }}
              />
            </div>
            <div className="movie-info">
              <h2 className="movie-title">{movie.title}</h2>
              <p className="movie-overview">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearchPage;
