import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
  },
});

export const Review = mongoose.model("review", reviewSchema);
