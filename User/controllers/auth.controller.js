import express from "express"
import { generateAccessAndRefreshToken, generateAccessToken } from "../utils/jwt.js"
import { authenticate, refreshMiddleware } from "../middlewares/authenticate.js"
import {UserModel} from "../models/user.model.js"
import { signupSchema, logInSchema } from "../validation/auth.validation.js"
import bcrypt from "bcryptjs"


const authRoutes = (app, channel)=>{
    app.post("/register", register)
    app.post("/login", login)
    app.get("/logout", authenticate, logout)
    app.get("/refresh", refreshMiddleware, refresh)
}

const register = async (req, res, next) => {
    try{    
        const {error, value} = signupSchema.validate(req.body, {
            allowUnknown : false
        })
        if(error){
            throw error
        }
        const {username, password, role} = value
        const user = await UserModel.findOne({username : username})
        if(user){
            const err = new Error("the username is already used")
            throw err
        }
        const hashed_password = await bcrypt.hash(password, 10)
        const newUser = UserModel({
            username,
            password,
            role
        })
        await newUser.save()
        const {accessToken, refreshToken} = generateAccessAndRefreshToken(newUser)
        res.cookie("accessToken", accessToken, {
            httpOnly : true,
            secure : true,
            sameSite : "strict",
            maxAge : 1000 * 60 * 60 * 24
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly : true,
            secure : true,
            sameSite : "strict",
            maxAge : 1000 * 60 * 60 * 24
        })
        .json(newUser)
    }
    catch(err){
        console.log(err.name)
        next(err)
    }
}

const login = async (req, res, next) => {
    try{
        const {error} = logInSchema.validate(req.body)
        const {username, password} = req.body
        const user = await UserModel.findOne({
            username : username
        })
        if(!user){
            const err = new Error("the user doesn't exist")
            throw err
        }
        console.log(user)
        if(!await bcrypt.hash(password, user.password)){
            const err = new Error("logIn credentials are wrong")
            throw err
        }
        console.log("the user exists")
        const {accessToken, refreshToken} = generateAccessAndRefreshToken(user)
        res.cookie("accessToken", accessToken, {
            httpOnly : true,
            secure : true,
            sameSite : "strict",
            maxAge : 1000 * 60 * 60 * 24
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly : true,
            secure : true,
            sameSite : "strict",
            maxAge : 1000 * 60 * 60 * 24
        })
        .json(req.body)
    }
    catch(err){
        next(err)
    }
}

const logout = (req, res, next) => {
    console.log("this is the logout controller")
    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")
    res.json({
        message : "you are logged out"
    })
}

const refresh = (req, res, next) => {
    const {accessToken} = generateAccessToken(req.user)
            res.cookie("accessToken", accessToken, {
            httpOnly : true,
            secure : true,
            sameSite : "strict",
            maxAge : 1000 * 60 * 60 * 24
        })
        .json({
            message : "refreshed, new accessToken obtained"
        })
}

export {authRoutes}