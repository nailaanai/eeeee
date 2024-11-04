import { Op } from "sequelize";
import fs from "fs";
import path from "path";
import Movie from "../models/movies.model.js";
import Genre from "../models/genres.model.js"; // Pastikan untuk mengimpor Genre
import Actor from "../models/actors.model.js"; // Pastikan untuk mengimpor Actor

// Fungsi untuk membuat film baru
export const createMovie = async (req, res) => {
    try {
      const {
        title,
        alt_title,
        synopsis,
        year,
        rating,
        trailer,
        category,
        country_id,
        genres, // Array of genre IDs
        actors, // Array of actor IDs
      } = req.body;

      console.log(typeof genres, typeof actors)
  
      // Jika ada file poster, simpan dengan path seperti pada addActor
      const posterPath = req.file ? `uploads/movies/${req.file.filename}` : null;
  
      // Pastikan bahwa field title dan posterPath ada
      if (!title || !posterPath) {
        return res.status(400).json({
          success: false,
          message: "Both title and poster are required.",
        });
      }
  
      // Membuat entri baru dalam tabel Movie
      const movie = await Movie.create({
        title,
        alt_title,
        synopsis,
        year,
        rating,
        poster: posterPath,
        trailer,
        category,
        country_id,
      });
      
      const genresdata = JSON.parse(genres)

      const actorsdata = JSON.parse(actors)

      console.log(genresdata, actorsdata)

      // Menambahkan hubungan many-to-many ke Genre
      if (Array.isArray(genresdata) && genresdata.length > 0) {
        const genreInstances = await Genre.findAll({
          where: { id: { [Op.in]: genresdata } },
        });
        console.log("Genre instances found:", genreInstances);
        await movie.addGenres(genreInstances);
      }
  
      // Menambahkan hubungan many-to-many ke Actor
      if (Array.isArray(actorsdata) && actorsdata.length > 0) {
        const actorInstances = await Actor.findAll({
          where: { id: { [Op.in]: actorsdata } },
        });
        console.log("Actor instances found:", actorInstances);
        await movie.addActors(actorInstances);
      }
  
      res.status(201).json({
        success: true,
        message: "Movie created successfully",
        movie,
      });
    } catch (error) {
      console.error("Error creating movie:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create movie",
      });
    }
  };
  

// Menghapus poster file jika terjadi error saat menyimpan
const deletePoster = (posterPath) => {
  try {
    fs.unlinkSync(posterPath);
  } catch (error) {
    console.error("Error deleting poster file:", error);
  }
};