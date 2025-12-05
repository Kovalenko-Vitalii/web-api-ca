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
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        import.meta.env.VITE_TMDB_KEY +
        "&language=en-US"
    ).then( (response) => {
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


  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
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

  export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
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
  return fetch(`${BASE}/movie/${id}/credits?api_key=${API_KEY}`).then(handle);
};

export const getMovieRecommendations = ({ queryKey }) => {
  const [, idPart, page = 1] = queryKey;
  const { id } = idPart;
  return fetch(`${BASE}/movie/${id}/recommendations?api_key=${API_KEY}&page=${page}`).then(handle);
};

export const getMovieSimilar = ({ queryKey }) => {
  const [, idPart, page = 1] = queryKey;
  const { id } = idPart;
  return fetch(`${BASE}/movie/${id}/similar?api_key=${API_KEY}&page=${page}`).then(handle);
};

export const getPerson = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(`${BASE}/person/${id}?api_key=${API_KEY}`).then(handle);
};

export const getPersonCombinedCredits = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(`${BASE}/person/${id}/combined_credits?api_key=${API_KEY}`).then(handle);
};

export const getDiscoverMovies = (params = {}) => {
  const q = new URLSearchParams({
    api_key: API_KEY,
    include_adult: "false",
    include_video: "false",
    language: "en-US",
  });

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") q.set(k, String(v));
  });

  return fetch(`${BASE}/discover/movie?${q.toString()}`).then(handle);
};;

export const getTopRatedMovies = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&page=${page}`
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

