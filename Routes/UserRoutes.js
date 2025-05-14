const express = require('express');
const router = express.Router();
const { getMovieByIndex, getUserName, createNewUser, getAllUser } = require('../Controller/UserController');

//userpost
router.post('/postuser', createNewUser);
router.get('/getAllUser', getAllUser)
// router.get('/movies/:index', getMovieByIndex); 
// router.get('/getUserName', getUserName);

module.exports = router;