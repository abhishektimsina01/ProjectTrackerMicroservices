import cookieParser from "cookie-parser"
import express from "express"
import morgan from "morgan"
import {notFound, errorHandler} from "./middlewares/errorHandling.js"
import { task } from "./controllers/task.controller.js"

export const appConfiguration = (app, channel) => {
    app.use(morgan("dev"))
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.urlencoded({extended : true}))
    task(app, channel)
    app.use(notFound)
    app.use(errorHandler)
}