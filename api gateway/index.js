import express from "express"
import cors from "cors"
import proxy from "express-http-proxy"
import cookieParser from "cookie-parser"

const app = express()

// middlewares where we can to rate limiting, cors, parsing, jwt validation
app.use((req, res, next) => {
    console.log(req.method)
    console.log(req.originalUrl)
    console.log("middleware of api_gatewa")
    next()
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())


// request routing
app.use("/auth", proxy("http://localhost:8001"))
app.use("/projects", proxy("http://localhost:8002"))
app.use("/tasks", proxy("http://localhost:8003"))
app.use("/notification", proxy("http://localhost:8004"))


// directly listens to the user/FE for the request as they only know this port
app.listen(8000, (err)=>{
    if(err){
        console.log("an error has occurred in api gateway")
    }
    else{
        console.log("The gate way has started listening")
    }
})