// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');

// Create an Express application
const app = express();

// Connect to MongoDB
mongoose.connect(MongoDB connection string here, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the movie schema
const movieSchema = new mongoose.Schema({
  moviename: String,
  releasedate: Date,
  theatrename: String,
  theatrelocation: String,
});

// Create a Movie model
const Movie = mongoose.model('Movie', movieSchema);

// Define a route to fetch all movies
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define a route to fetch a specific movie by ID
app.get('/api/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
