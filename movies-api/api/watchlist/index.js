import express from "express";
import asyncHandler from "express-async-handler";
import Watchlist from "./watchlistModel";
import authenticate from "../../authenticate";

const router = express.Router();
router.use(authenticate);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const items = await Watchlist.find({ userId: req.user._id });
    res.status(200).json(items.map((x) => x.movieId));
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    if (!movieId) return res.status(400).json({ success: false, msg: "movieId required" });

    const item = await Watchlist.create({ userId: req.user._id, movieId });
    res.status(201).json(item);
  })
);

router.delete(
  "/:movieId",
  asyncHandler(async (req, res) => {
    const movieId = Number(req.params.movieId);
    await Watchlist.deleteOne({ userId: req.user._id, movieId });
    res.status(204).json();
  })
);

export default router;
