const express = require('express');
const router = express.Router();
const { getMovieByIndex, getUserName, createNewUser, getAllUser, deleteUser, updateUser, authroute } = require('../Controller/UserController');
const {authmiddlevare} = require('../authmiddlevare')
const { getSpotifyToken,  searchSpotifyTracks } = require('../Controller/spotifyAuth'); //spotify route
const { getBooksByMood } = require('../Controller/books')



//userpost
router.post('/postuser', createNewUser);
router.get('/getAllUser',authmiddlevare, getAllUser);
router.delete('/deleteUser', deleteUser);
router.put('/updateUser/:UserId', updateUser);
router.post('/login', authroute);
router.get('/spotify/token', getSpotifyToken);
router.get("/spotify/search/:query", searchSpotifyTracks);
router.get('/books/:mood', getBooksByMood);
// router.get('/movies/:index', getMovieByIndex); 
// router.get('/getUserName', getUserName);

module.exports = router;