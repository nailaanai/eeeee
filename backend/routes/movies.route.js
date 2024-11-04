import express from "express";
import { createMovie } from "../controllers/movies.controller.js";
import upload, { setUploadPath } from "../middleware/uploads.js";

const router = express.Router();

// Rute untuk membuat film baru dengan unggahan poster
router.post("/movies", setUploadPath("movies"), upload.single("poster"), createMovie); // Menambahkan film dengan poster di folder "uploads/movies"

export default router;

