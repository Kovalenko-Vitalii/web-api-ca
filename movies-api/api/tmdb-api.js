import fetch from 'node-fetch';

export const getMovies = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    );

    if (!response.ok) {
        throw new Error(response.json().message);
    }

    return await response.json();
};

export const getMovie = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.status_message || "TMDB error");
  }

  return await response.json();
};

export const getUpcomingMovies = async (page = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.status_message || "TMDB error");
  }

  return await response.json();
};

export const getGenres = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.status_message || "TMDB error");
  }

  return await response.json();
};

export const getMovieImages = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.status_message || "TMDB error");
  }

  return await response.json();
};

export const getMovieReviews = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.status_message || "TMDB error");
  }

  return await response.json();
};

export const getTopRatedMovies = async (page = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.status_message || "TMDB error");
  }

  return await response.json();
};