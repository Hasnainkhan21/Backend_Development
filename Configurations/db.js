const DB_URI = 'mongodb+srv://Admin:Admin12345@cluster0.rt61viy.mongodb.net/Moodora'
const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
            await mongoose.connect(DB_URI);
            console.log('Db conncted successfully');
        } catch(error){
        console.log(error)
    } 
}

module.exports = connectDB;