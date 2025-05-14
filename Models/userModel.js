const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    Password: String,
},{timestamps:true})

module.exports= mongoose.model('user',userSchema);