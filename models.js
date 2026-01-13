// models.js
import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    Genre: {
      Name: { type: String, required: true },
      Description: { type: String, required: true },
    },
    Director: {
      Name: { type: String, required: true },
      Bio: { type: String, required: true },
      Birth: { type: String },
      Death: { type: String },
    },
    ImagePath: { type: String, required: true },
    Featured: { type: Boolean, default: false },
    Actors: [{ type: String }],
    ReleaseYear: { type: Number },
    Rating: { type: String },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    Username: { type: String, required: true, unique: true },
    Password: { type: String, required: true }, // later you’ll hash this
    Email: { type: String, required: true, unique: true },
    Birthday: { type: Date },
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  },
  { timestamps: true }
);

export const Movie = mongoose.model("Movie", movieSchema);
export const User = mongoose.model("User", userSchema);
