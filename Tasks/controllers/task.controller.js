import {authenticate, authorize} from "../middlewares/authenticaton_authoriazation.js"
import {TaskModel} from "../models/task.model.js"

const task = (app, channel) => {
    app.get("/", authenticate, getAllTasks)
    app.get("/:id", authenticate, getTask)
    app.post("/:id", authenticate, createTask)
}

const getAllTasks = async(req, res, next) => {
    try{
        const tasks = await TaskModel.find()
        res.json(tasks)
    }
    catch(err){
        next(err)
    }
}


const getTask = async(req, res, next) => {
    try{ 
        const task = await TaskModel.findById(req.params.id)
        if(!task){
            const err = new Error("no task found")
            throw err
        }
        res.json(task)
    }
    catch(err){
        next(err)
    }
}

const createTask = async(req, res, next) => {
    try{
        const name = req.body.name
        const description = req.body?.description
        const _id = req.user._id
        const username = req.user.username
        const res1 = await fetch(`http://localhost:8010/api/user/${_id}`, {
            method : "GET",
            headers : {
                "Content-Type": "application/json",
                Cookie : req.headers.cookie
            }
        })
        const res1_parse = await res1.json()
        const assigned_by = {
            _id : res1_parse._id,
            username : res1_parse.username
        }
        const res2 = await fetch(`http://localhost:8010/api/user/${req.params.id}`, {
            method : "GET",
            headers : {
                "Content-Type": "application/json",
                Cookie : req.headers.cookie
            }
        })
        const res2_parse = await res2.json()
        const assigned_to = {
            _id : res2_parse._id,
            username : res2_parse.username
        }
        const task = TaskModel({...req.body, assigned_by, assigned_to})
        await task.save()
        res.json(task)
    }
    catch(err){
        next(err)
    }
}


export {task}