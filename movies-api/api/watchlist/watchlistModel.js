import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WatchlistSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    movieId: { type: Number, required: true },
  },
  { timestamps: true }
);

WatchlistSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export default mongoose.model("Watchlist", WatchlistSchema);
