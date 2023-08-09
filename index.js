import express from 'express';

import { Login, Register } from './Controllers/user.controller.js';
import mongoose from 'mongoose';

const app = express();

// req - frontend sends some data to backend
// res - backend sends data back to frontend
app.get("/", function (req, res) {
    res.send("Working...")
})

// app.get("/Login", function (req, res) {
//     res.send("login here")
// })

app.get("/login", Login)

// app.get("/Register", function (req, res) {
//     res.send("Register here")
// })

app.get("/Register", Register)

mongoose.connect("mongodb+srv://poojarv:9892160847%40p@cluster0.weveaex.mongodb.net/BACKEND-AWDIZ").then(()=>{
    console.log("connected to mongoDB")}).catch((error)=>{
        console.log("error while cconnecting to mongoDb",error);
    });

app.listen(8000, () => {
    console.log("Server running on port 8000")
})