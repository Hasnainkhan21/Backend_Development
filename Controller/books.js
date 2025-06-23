// controllers/bookController.js
const axios = require('axios');

const API_KEY = 'AIzaSyBjokRTOFN26IzXmSJfIaGFxC8ee6qZNho';

const moodToSubject = {
  Happy: 'humor',
  Motivated: 'success',
  Relaxed: 'meditation',
  Sad: 'self-improvement',
  Angry: 'philosophy',
};

exports.getBooksByMood = async (req, res) => {
  const mood = req.params.mood || 'Relaxed';
  const subject = moodToSubject[mood] || 'fiction';

  const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&maxResults=30&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    const books = response.data.items || [];
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error.message);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};
