const express = require('express');
const router = express.Router();
const {createNewUser, getAllUser, deleteUser, updateUser, authroute} = require('../Controller/UserController');
const {authmiddlevare} = require('../authmiddlevare')
const { getSpotifyToken,  searchSpotifyTracks } = require('../Controller/spotifyAuth'); //spotify route
const { getBooksByMood } = require('../Controller/books')
const { createFeedback, getAllFeedback } = require('../Controller/Review');



//userpost
router.post('/postuser', createNewUser);
router.get('/getAllUser',authmiddlevare, getAllUser);
router.delete('/deleteUser', deleteUser);
router.put('/updateUser/:UserId', updateUser);
router.post('/login', authroute);
router.get('/spotify/token', getSpotifyToken);
router.get("/spotify/search/:query", searchSpotifyTracks);
router.get('/books/:mood', getBooksByMood);
router.post('/addReviews', createFeedback);
router.get('/Allreviews', getAllFeedback);


module.exports = router;