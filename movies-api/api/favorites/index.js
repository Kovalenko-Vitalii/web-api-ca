import express from "express";
import asyncHandler from "express-async-handler";
import Favorite from "./favoriteModel";
import authenticate from "../../authenticate";

const router = express.Router();

router.use(authenticate);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const items = await Favorite.find({ userId: req.user._id });
    res.status(200).json(items.map((x) => x.movieId));
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    if (!movieId) return res.status(400).json({ success: false, msg: "movieId required" });

    const fav = await Favorite.create({ userId: req.user._id, movieId });
    res.status(201).json(fav);
  })
);

router.delete(
  "/:movieId",
  asyncHandler(async (req, res) => {
    const movieId = Number(req.params.movieId);
    await Favorite.deleteOne({ userId: req.user._id, movieId });
    res.status(204).json();
  })
);

export default router;
