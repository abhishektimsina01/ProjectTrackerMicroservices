import express from "express"
import {authenticate} from "../middlewares/authenticate.js"
import {authorize} from "../middlewares/authorize.js"
import { UserModel } from "../models/user.model.js"


export const userRoutes = async(app, channel) => {
    app.get("/profile", authenticate, authorize("developer", "pm"), getProfile)
    app.get("/",authenticate, authorize("pm", "developer"), getAllUsers)
    app.get("/:id", authenticate, authorize("pm", "developer"), getUser)
    app.delete("/:id", authenticate, authorize("pm", "developer"), deleteUser)
    app.delete("/", deleteAllUsers)
}

const getProfile = (req, res, next) => {
    try{
        res.json(req.user)
    }
    catch(err){
        next(err)
    }
}


const getAllUsers = async(req, res, next) => {
    try{
        const users = await UserModel.find({ role : "developer"}).select("-password")
        if(users.length == 0){
            res.json({
                message : "no developers"
            })
        }
        res.json(users)
    }
    catch(err){
        next(err)
    }
}


const getUser = async(req, res, next) => {
    try{
        const user_id = req.params.id
        const user = await UserModel.findById(user_id).select("-password")
        if(!user){
            const err = new Error("no user found with such id")
            err.status = 404
            throw err
        }
        res.json(user)
    }
    catch(err){
        next(err)
    }
}


const deleteUser = async(req, res, next) => {
    try{
        console.log(req.params)
        const user = await UserModel.findByIdAndDelete(req.params.id)
        if(!user){
            const err = new Error("no user found")
            throw err
        }
        res.json({
            message : "user deleted"
        })
    }
    catch(err){
        next(err)
    }
}


const deleteAllUsers = async(req, res, next) => {
    const users = await UserModel.find({})
    await UserModel.deleteMany({
        _id : { $exists : true}
        })
        res.json({
            users : users,
            message : "deleted all the users"
        })
}