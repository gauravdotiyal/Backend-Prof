// require('dotenv').config({path:'./env'})
import dotenv from 'dotenv' 
import mongoose from "mongoose";
dotenv.config({
    path:'./env'
});


import connectDB from "./db/index.js"; 
//Second Approach importing from other file 
connectDB();









/*
//First Approach write code in the main file for mongodb 
import express from 'express'
import { DB_NAME } from "./constants"; 
const app=express();

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