import express from 'express';
import authRouter from './src/routes/auth.router.js'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'

const app=express();

dotenv.config()
app.use(express.json())
app.use(cookieParser)
app.use("/api/auth/",authRouter)
app.listen(3000,()=>{
    console.log("App is running on port number 3000")
});