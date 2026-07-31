import express from "express"
import { notFound, errorHandler } from "./middlewares/errorHandler"

const app = express()

app.use((req, res, next) => {
    console.log("this is the middleware of the Auth service")
    next()
})

app.post("/register")
app.post("/login")
app.get("/refresh")
app.get("/logout")

app.use(notFound)
app.use(errorHandler)

app.listen(8001,(err) => {
    if(err){
        console.log("error in the server")
    }
    else{
        console.log("Auth service in on✅")
    }
})