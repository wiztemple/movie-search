import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MovieSearchPage from '../MovieSearchPage';
import useMovieSearch from '../hooks/useMovieSearch';

jest.mock('../hooks/useMovieSearch');

const mockedUseMovieSearch = useMovieSearch as jest.MockedFunction<typeof useMovieSearch>;

describe('MovieSearchPage', () => {
  beforeEach(() => {
    mockedUseMovieSearch.mockReturnValue({
      movies: [],
      isLoading: false,
      isError: false,
      searchMovies: jest.fn(),
    });
  });

  it('renders the search input and button', () => {
    render(<MovieSearchPage />);

    expect(screen.getByPlaceholderText('Search for a movie...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('calls searchMovies when the search button is clicked', () => {
    const searchMoviesMock = jest.fn();
    mockedUseMovieSearch.mockReturnValue({
      movies: [],
      isLoading: false,
      isError: false,
      searchMovies: searchMoviesMock,
    });

    render(<MovieSearchPage />);

    fireEvent.change(screen.getByPlaceholderText('Search for a movie...'), { target: { value: 'Inception' } });
    fireEvent.click(screen.getByText('Search'));

    expect(searchMoviesMock).toHaveBeenCalledWith('Inception');
  });

  it('calls searchMovies when the Enter key is pressed', () => {
    const searchMoviesMock = jest.fn();
    mockedUseMovieSearch.mockReturnValue({
      movies: [],
      isLoading: false,
      isError: false,
      searchMovies: searchMoviesMock,
    });

    render(<MovieSearchPage />);

    fireEvent.change(screen.getByPlaceholderText('Search for a movie...'), { target: { value: 'Inception' } });
    fireEvent.keyDown(screen.getByPlaceholderText('Search for a movie...'), { key: 'Enter', code: 'Enter' });

    expect(searchMoviesMock).toHaveBeenCalledWith('Inception');
  });

  it('displays loading state correctly', () => {
    mockedUseMovieSearch.mockReturnValue({
      movies: [],
      isLoading: true,
      isError: false,
      searchMovies: jest.fn(),
    });

    render(<MovieSearchPage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error state correctly', () => {
    mockedUseMovieSearch.mockReturnValue({
      movies: [],
      isLoading: false,
      isError: true,
      searchMovies: jest.fn(),
    });

    render(<MovieSearchPage />);

    expect(screen.getByText('Error loading data')).toBeInTheDocument();
  });

  it('displays movies correctly', () => {
    const movies = [
      {
        id: 1,
        title: 'Inception',
        overview: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
        poster_path: '/inception.jpg',
        backdrop_path: '/inception_backdrop.jpg',
      },
    ];
    mockedUseMovieSearch.mockReturnValue({
      movies,
      isLoading: false,
      isError: false,
      searchMovies: jest.fn(),
    });

    render(<MovieSearchPage />);

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('A thief who steals corporate secrets through the use of dream-sharing technology.')).toBeInTheDocument();
    expect(screen.getByAltText('Inception poster')).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/inception.jpg');
  });

  it('displays default image if poster image fails to load', () => {
    const movies = [
      {
        id: 1,
        title: 'Inception',
        overview: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
        poster_path: '/invalid_path.jpg',
      },
    ];
    mockedUseMovieSearch.mockReturnValue({
      movies,
      isLoading: false,
      isError: false,
      searchMovies: jest.fn(),
    });

    render(<MovieSearchPage />);

    const image = screen.getByAltText('Inception poster') as HTMLImageElement;
    fireEvent.error(image);

    expect(image).toHaveAttribute('src', 'image.png');
  });
});
