import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'


const app = express()
dotenv.config()


const port = process.env.PORT || 5000
const start = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        app.listen(port, console.log('server is listing'))
    } catch (error) {
        console.log(error)
    }
}

start()