import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies, 
    getUpcomingMovies,
    getMovie,
    getGenres,
    getMovieImages,
    getTopRatedMovies,
    getMovieReviews
     } from '../tmdb-api'; 


const router = express.Router();

router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

router.get('/movie/:id', asyncHandler(async (req, res) => {
  const movie = await getMovie(req.params.id);
  res.status(200).json(movie);
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const movies = await getUpcomingMovies(page);
  res.status(200).json(movies);
}));

router.get('/genres', asyncHandler(async (req, res) => {
  const genres = await getGenres();
  res.status(200).json(genres);
}));

router.get('/movie/:id/images', asyncHandler(async (req, res) => {
  const images = await getMovieImages(req.params.id);
  res.status(200).json(images);
}));

router.get('/movie/:id/reviews', asyncHandler(async (req, res) => {
  const reviews = await getMovieReviews(req.params.id);
  res.status(200).json(reviews);
}));

router.get('/top_rated', asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const movies = await getTopRatedMovies(page);
  res.status(200).json(movies);
}));

export default router;
