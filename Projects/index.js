import cookieParser from "cookie-parser"
import express from "express"
import morgan from "morgan"
import {notFound, errorHandler} from "./middleware/errorHandling.js"
import { project } from "./controllers/project.controller.js"

export const appConfiguration = (app, channel) => {
    app.use(morgan("dev"))
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.urlencoded({extended : true}))
    project(app, channel)
    app.use(notFound)
    app.use(errorHandler)
}