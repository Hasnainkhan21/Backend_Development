const express = require('express');
const connectdb = require('./Configurations/db');
const app = express();
const cors = require('cors')
const UserRoutes = require('./Routes/UserRoutes')
const {authmiddlevare} = require('./authmiddlevare')


connectdb();

//Middlevare
app.use(cors())
app.use(express.json());
app.use('/api/v0/users', UserRoutes);

app.get('/authmiddlevare', authmiddlevare, (req, res)=>{
   console.log(req.user.userId)
   console.log(req.user.userName)
   console.log(req.user.email)
   console.log("accessed authorized");
})

app.listen(3000, ()=>{
   console.log("Server is running on port http://localhost:3000");
})


