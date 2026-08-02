// all the auth stuffs will be here
import express from "express"
import {authenticate} from "../middlewares/authenticate.js"
import {authorize} from "../middlewares/authorize.js"
import { register, login, logout, refresh } from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.get("/refresh", refresh)
authRouter.get("/logout", authenticate, logout)

export {authRouter}