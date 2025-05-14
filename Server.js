const express = require('express');
const connectdb = require('./Configurations/db');
const app = express();
const UserRoutes = require('./Routes/UserRoutes')


connectdb();

app.use(express.json());
//Middlevare
app.use('/api/v0/users', UserRoutes);

app.listen(3000, ()=>{
   console.log("Server is running on port http://localhost:3000");
})


