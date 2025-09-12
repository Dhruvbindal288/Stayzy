import express from 'express';
import authRouter from './src/routes/auth.router.js'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import connectDb from './src/lib/db.js';
const app=express();


app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))


app.use(express.json())

app.use(cookieParser())
app.use("/api/auth/",authRouter)
app.listen(3000,()=>{
   connectDb()
    console.log("App is running on port number 3000")
    

});