import express from "express"
import {connectDB} from "./db.config.js"
import dotenv from "dotenv"
import { createChannel } from "./utils/rabbitMQ.js"
import { appConfiguration } from "./index.js"
dotenv.config()


const startServer = async => {
    try{
        const app = express()
        await connectDB(process.env.url)
        // const channel = await createChannel()
        appConfiguration(app, channel = null)
        app.listen(8001,(err) => {
        if(err){
            console.log("error in the server")
        }
        else{
            console.log("Auth and User services are on✅")
            }
        })
    }
    catch(err){
        console.log(err.name)
        console.log(err.message)
        console.log("couldnot connect with the database")
    }
}

startServer()