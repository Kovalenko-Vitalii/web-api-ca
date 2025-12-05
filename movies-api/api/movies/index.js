import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies, 
    getUpcomingMovies,
    getMovie } from '../tmdb-api'; 


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

export default router;
