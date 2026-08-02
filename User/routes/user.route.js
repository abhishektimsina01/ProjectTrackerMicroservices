// all the users stuffs will be here
import express from "express"
import { authenticate } from "../middlewares/authenticate.js"
import { authorize } from "../middlewares/authorize.js"
import { getProfile } from "../controllers/user.controller.js"

const userRouter = express.Router()

userRouter.get("/getTasks", authenticate, authorize, getProfile)

export {userRouter}