import express from "express"
import { notFound, errorHandler } from "./middlewares/errorHandler.js"
import {authRouter} from "./routes/auth.route.js"
import {userRouter} from "./routes/user.route.js"

const app = express()

app.use((req, res, next) => {
    console.log("this is the middleware of the Auth service")
    next()
})

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

app.use(notFound)
app.use(errorHandler)

export {app}