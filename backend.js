import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import useroutes from './route/routes.js'

import cookieParser from 'cookie-parser';





mongoose.connect('mongodb+srv://yt781703:RvFdVIFxlRYLVL4x@farming.q7deves.mongodb.net/?retryWrites=true&w=majority&appName=farming').then(()=>{
    console.log("Connected to database",mongoose.connection.db.databaseName)
}).catch(err=>{
    console.log("Error connecting to database",err)
});




const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://farming-project-git-main-yogeshtiwari12s-projects.vercel.app',
    credentials: true,
    
}));


app.use('/useroutes', useroutes)

app.listen(4000,()=>{
    console.log("Server is running")
})
