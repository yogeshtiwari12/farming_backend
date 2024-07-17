import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import useroutes from './route/routes.js'
import User from './model/models.js'
import dotenv from 'dotenv';

dotenv.config()
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true


}).then(()=>{
    console.log("Connected to database",mongoose.connection.db.databaseName)
}).catch(err=>{
    console.log("Error connecting to database",err)
});


// async function showdata(contact_number){
//     try {
//         const data = await User.findOne({contact_number})
//         console.log()
//         console.log("backend data : "+data)
    
//     } catch (error) {
//         console.log("something went wrong",error)
//     }
// }
// showdata(1234567890)

const app = express();

app.use(express.json());
app.use(cors());
app.use('/useroutes', useroutes)

app.listen(3000,()=>{
    console.log("Server is running")
})
