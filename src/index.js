// require('dotenv').config({path:'./env'})
import dotenv from 'dotenv' 
import mongoose from "mongoose";
import { app } from './app.js';
dotenv.config({
    path:'./env'
});


import connectDB from "./db/index.js"; 
//Second Approach importing from other file 
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is Running at port ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("MongoDB connection failed ", error);
})









/*
//First Approach write code in the main file for mongodb 
import express from 'express'
import { DB_NAME } from "./constants"; 
const app=express();

// if if syntax 
(async () => {
  try {
    await mongoose.connnect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error",(error)=>{
        console.log("ERROR: ",error)
        throw error
    })
    app.listen(process.env.PORT,()=>{
        console.log(`App is listening in ${process.env.PORT}`);
    })
  } catch (error) {
    console.error("ERROR : ", error);
    throw error;
  }
})();

*/