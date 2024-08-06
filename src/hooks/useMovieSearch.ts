import { useState } from 'react';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

const useMovieSearch = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const searchMovies = async (query: string) => {
    setIsLoading(true);
    setIsError(false);
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: apiKey,
          query,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      setIsError(true);
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { movies, isLoading, isError, searchMovies };
};

export default useMovieSearch;
