const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE = "https://api.themoviedb.org/3";

const handle = (res) =>
  res.ok
    ? res.json()
    : res.json().then((e) => {
        throw new Error(e.status_message || "Something went wrong");
      });

export const getMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/discover`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};



export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/movie/${id}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};



export const getGenres = () => {
  return fetch(
    `http://localhost:8080/api/movies/genres`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/movie/${id}/images`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};


export const getMovieReviews = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/movie/${id}/reviews`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};



export const getUpcomingMovies = (page = 1) => {
  return fetch(
    `http://localhost:8080/api/movies/upcoming?page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};


export const getMovieCredits = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/movie/${id}/credits`
  ).then(handle);
};


export const getMovieRecommendations = ({ queryKey }) => {
  const [, idPart, page = 1] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/movie/${id}/recommendations?page=${page}`
  ).then(handle);
};


export const getMovieSimilar = ({ queryKey }) => {
  const [, idPart, page = 1] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/movie/${id}/similar?page=${page}`
  ).then(handle);
};


export const getPerson = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/person/${id}`
  ).then(handle);
};


export const getPersonCombinedCredits = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/person/${id}/combined_credits`
  ).then(handle);
};


export const getDiscoverMovies = (params = {}) => {
  const q = new URLSearchParams({
    include_adult: "false",
    include_video: "false",
    language: "en-US",
  });

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") q.set(k, String(v));
  });

  return fetch(
    `http://localhost:8080/api/movies/discover/advanced?${q.toString()}`
  ).then(handle);
};


export const getTopRatedMovies = (page = 1) => {
  return fetch(
    `http://localhost:8080/api/movies/top_rated?page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const login = async (username, password) => {
  const response = await fetch("http://localhost:8080/api/users", {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify({ username: username, password: password }),
  });
  return response.json();
};

export const signup = async (username, password) => {
  const response = await fetch("http://localhost:8080/api/users?action=register", {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify({ username: username, password: password }),
  });
  return response.json();
};

const authHeader = () => ({
  Authorization: window.localStorage.getItem("token"),
});

export const getFavorites = async () => {
  const res = await fetch("http://localhost:8080/api/favorites", {
    headers: authHeader(),
  });
  return res.json();
};

export const addFavorite = async (movieId) => {
  const res = await fetch("http://localhost:8080/api/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ movieId }),
  });
  return res.json();
};

export const removeFavorite = async (movieId) => {
  return fetch(`http://localhost:8080/api/favorites/${movieId}`, {
    method: "DELETE",
    headers: authHeader(),
  });
};

export const getWatchlist = async () => {
  const res = await fetch("http://localhost:8080/api/watchlist", {
    headers: authHeader(),
  });
  return res.json();
};

export const addWatchlist = async (movieId) => {
  const res = await fetch("http://localhost:8080/api/watchlist", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ movieId }),
  });
  return res.json();
};

export const removeWatchlist = async (movieId) => {
  return fetch(`http://localhost:8080/api/watchlist/${movieId}`, {
    method: "DELETE",
    headers: authHeader(),
  });
};
