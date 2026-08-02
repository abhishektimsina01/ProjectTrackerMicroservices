import {connectDB} from "./db.config.js"
import dotenv from "dotenv"
import {app} from "./index.js"

dotenv.config()

const startServer  = (app) => {
    connectDB(process.env.url).then(() => {
        console.log("app is listening")
        app.listen(8001,(err) => {
        if(err){
            console.log("error in the server")
        }
        else{
            console.log("Auth service in on✅")
            }
        })
    })
    .catch((err) => {
        console.log(err.name)
        console.log(err.message)
        console.log("couldnot connect with the database")
    })
}
startServer(app)