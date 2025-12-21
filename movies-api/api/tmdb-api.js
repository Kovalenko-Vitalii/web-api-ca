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

export const getMovieCredits = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_KEY}`
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.status_message || "TMDB error");
  }

  return await response.json();
};

export const getMovieRecommendations = async (id, page = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.TMDB_KEY}&page=${page}`
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.status_message || "TMDB error");
  }

  return await response.json();
};

export const getMovieSimilar = async (id, page = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.TMDB_KEY}&page=${page}`
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.status_message || "TMDB error");
  }

  return await response.json();
};

export const getPerson = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_KEY}`
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.status_message || "TMDB error");
  }

  return await response.json();
};

export const getPersonCombinedCredits = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${process.env.TMDB_KEY}`
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.status_message || "TMDB error");
  }

  return await response.json();
};

export const getDiscoverMovies = async (params = {}) => {
  const q = new URLSearchParams({
    include_adult: 'false',
    include_video: 'false',
    language: 'en-US',
  });

  // adding/overriding params from function argument
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      q.set(k, String(v));
    }
  });

  // api_key adding only on backend to avoid exposing it in frontend
  q.set('api_key', process.env.TMDB_KEY);

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?${q.toString()}`
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.status_message || 'TMDB error');
  }

  return await response.json();
};
