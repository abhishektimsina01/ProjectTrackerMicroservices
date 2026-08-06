import express from "express"
import { notFound, errorHandler } from "./middlewares/errorHandler.js"
import {authRouter} from "./routes/auth.route.js"
import {userRouter} from "./routes/user.route.js"
import morgan from "morgan"
import { authRoutes } from "./controllers/auth.controller.js"
import { userRoutes } from "./controllers/user.controller.js"


export const appConfiguration = (app, channel) => {
    app.use((req, res, next) => {
        console.log("this is the middleware of the Auth service")
        next()
    })
    app.use(morgan())
    authRoutes(app, channel)
    userRoutes(app, channel)
    app.use(notFound)
    app.use(errorHandler)
}