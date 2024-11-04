import sequelize from '../../db/connectDB.js'; // ESM Import
import { isAuthenticated } from '../../middleware/authMiddleware.js';

// Fetch all reviews
export const getReview = async (req, res) => {
  try {
    const [results] = await sequelize.query('SELECT * FROM reviews');
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Insert new review
export const addReview = async (req, res) => {
  const { movie_id, author, content, rating } = req.body;

  // Logging untuk memastikan data yang diterima
  console.log("Data diterima:", { movie_id, author, content, rating });

  // Validasi input
  if (!movie_id || !author || !content || !rating) {
      console.log("Validasi gagal: data tidak lengkap");
      return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = `INSERT INTO reviews (movie_id, author, content, rating) VALUES (?, ?, ?, ?)`;

  try {
      await sequelize.query(sql, {
          replacements: [movie_id, author, content, rating],
      });
      console.log("Review berhasil ditambahkan ke database");
      res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
      console.error('Error in addReview:', error); // Cetak error di server
      res.status(500).json({ error: error.message });
  }
};
