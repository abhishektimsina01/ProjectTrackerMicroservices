import {connectDB} from "./db.config.js"
import dotenv from "dotenv"
import {app} from "./index.js"

dotenv.config()

const startServer  = async(app) => {

    await connectDB(process.env.url)

    app.listen(8001,(err) => {
    if(err){
        console.log("error in the server")
    }
    else{
        console.log("Auth service in on✅")
        }
    })
}

startServer()