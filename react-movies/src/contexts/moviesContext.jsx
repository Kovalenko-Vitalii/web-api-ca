import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import {
  getFavorites, addFavorite, removeFavorite,
  getWatchlist, addWatchlist, removeWatchlist
} from "../api/tmdb-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const auth = useContext(AuthContext);

  const [favorites, setFavorites] = useState([]);
  const [mustWatch, setMustWatch] = useState([]);
  const [myReviews, setMyReviews] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const favIds = await getFavorites();
        const watchIds = await getWatchlist();
        setFavorites(Array.isArray(favIds) ? favIds : []);
        setMustWatch(Array.isArray(watchIds) ? watchIds : []);
      } catch (e) {
        setFavorites([]);
        setMustWatch([]);
      }
    };

    if (auth.isAuthenticated) load();
    else {
      setFavorites([]);
      setMustWatch([]);
    }
  }, [auth.isAuthenticated]);

  const addToFavorites = async (movie) => {
    if (!auth.isAuthenticated) return;
    if (favorites.includes(movie.id)) return;

    setFavorites((prev) => [...prev, movie.id]);
    try {
      await addFavorite(movie.id);
    } catch {
      setFavorites((prev) => prev.filter((id) => id !== movie.id));
    }
  };

  const removeFromFavorites = async (movie) => {
    if (!auth.isAuthenticated) return;
    setFavorites((prev) => prev.filter((id) => id !== movie.id));
    try {
      await removeFavorite(movie.id);
    } catch {}
  };

  const addToMustWatch = async (movie) => {
    if (!auth.isAuthenticated) return;
    if (mustWatch.includes(movie.id)) return;

    setMustWatch((prev) => [...prev, movie.id]);
    try {
      await addWatchlist(movie.id);
    } catch {
      setMustWatch((prev) => prev.filter((id) => id !== movie.id));
    }
  };

  const removeFromMustWatch = async (movie) => {
    if (!auth.isAuthenticated) return;
    setMustWatch((prev) => prev.filter((id) => id !== movie.id));
    try {
      await removeWatchlist(movie.id);
    } catch {}
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        mustWatch,
        addToFavorites,
        addToMustWatch,
        removeFromMustWatch,
        removeFromFavorites,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
