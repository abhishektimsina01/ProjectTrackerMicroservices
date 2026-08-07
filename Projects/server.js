import express from "express"
import dotenv from "dotenv"
import {connectDB} from "./db.config.js"
import { appConfiguration } from "./index.js"
dotenv.config()


const startServer = async() => {
    try{ 
        const app = express()
        appConfiguration(app, "channel")
        await connectDB(process.env.url)
        app.listen(8002, (err) => {
            if(err){
                console.log("the server couldnot start")
            }
            else{
                console.log("the server has started successfully")
            }
        })
    }
    catch(err){
        console.log(err.message)
    }
}

startServer()