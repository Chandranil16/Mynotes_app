const express = require('express');
const app = express();
const cors= require('cors');
require('dotenv').config();
const authrouter = require('./routes/Auth');
const Noterouter = require('./routes/Noteroute');
const mongoconnect= require('./db/Database');
app.use(cors({
  origin: "https://mynotes-app-frontend.onrender.com", 
  credentials: true
}));
app.use(express.json());
app.use('/api/auth',authrouter);
app.use('/api/notes', Noterouter);
app.listen(process.env.PORT,()=>{
    mongoconnect();

    console.log(`Server is running on port ${process.env.PORT}`);
})





