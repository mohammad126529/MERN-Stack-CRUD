import express from 'express';
import dontenv from "dotenv";
import { connectDB } from './config/db.js';

dontenv.config();

const app = express();

app.get('/products',(req,res)=>{
    
});


app.listen(5000,()=>{
    connectDB();
    console.log("Server started at http://localhost:5000");
});
