// we ensure that the user have the token, its valid and if yes then we fetch the user from the database
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { UserModel } from "../models/user.model.js"
dotenv.config()

export const authenticate = async(req, res, next) => {
    try{
        console.log("this is the authentication route")
        const accessToken = req.cookies?.accessToken
        if(!accessToken){
            const err = new Error("there is no acces token")
            err.status = 404
            throw err
        }
        const payload = jwt.verify(accessToken, process.env.access_secret_token)
        const user = await UserModel.findById(payload._id).select("-password")
        if(!user){
            const err = new Error("no user was found, please signUp")
            throw err
        }
        req.user = user
        console.log("you are authenticated")
        next()
    }
    catch(err){
        console.log(err.name)
        next(err)
    }
}


export const refreshMiddleware = async (req, res, next) => {
    try{
        const refreshToken = req.cookies?.refreshToken
        if(!refreshToken){
            const err = new Error("session ended, please login")
            throw err
        }
        const payload = jwt.verify(refreshToken, process.env.refresh_secret_token)
        console.log(payload)
        const user = await UserModel.findById(payload._id).select("-password")
        if(user){
            const err = new Error("no user was found")
            throw err
        }
        req.user = user
        console.log("refresh middleware completed")
        next()
    }
    catch(err){
        next(err)
    }
}