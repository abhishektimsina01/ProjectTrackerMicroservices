import {authenticate, authorize} from "../middleware/authenticaton_authoriazation.js"
import {ProjectModel} from "../models/project.model.js"

const project = (app, channel) => {
    app.get("/",authenticate, getAllprojects)
    app.get("/:id", authenticate, getProject)
    app.post("/", authenticate, createProject)
    app.patch("/:id", authenticate, editProject)
    app.delete("/", authenticate, deleteProjects)

}

const getAllprojects = async(req, res, next) => {
    try{
        const projects = await ProjectModel.find()
        res.json(projects)
    }
    catch(err){
        next(err)
    }
}


const deleteProjects = async(req, res, next) => {
    try{
        const projects = await ProjectModel.find()
        if(!projects.length == 0){
            await ProjectModel.deleteMany({
                _id : { $exists : true}
            })
            return res.json({
                "messge" : "projects deleted"
            })
        }
        res.json({
            "message" : "no projects available"
        })
    }
    catch(err){
        next(err)
    }
}


const getProject = async(req, res, next) => {
    try{ 
        const project = await ProjectModel.findById(req.params.id)
        if(!project){
            const err = new Error("no project found")
            throw err
        }
        res.json(project)
    }
    catch(err){
        next(err)
    }
}

const createProject = async(req, res, next) => {
    try{
        const {name} = req.body
        const _id = req.user._id
        const username = req.user.username
        const project = ProjectModel({name})
        project.project_manager.push({ _id, username})
        await project.save()
        res.json(project)
    }
    catch(err){
        next(err)
    }
}


const editProject = async(req, res, next) => {
    try{
        const { project_managers_id, members_id} = req.body
        const users = await fetch("http://localhost:8010/api/user/getData", {
            method : "POST",
            headers : {
                "Content-Type": "application/json",
                Cookie : req.headers.cookie
            },
            body : JSON.stringify(req.body)
        })
        const users_data = await users.json()
        const project = await ProjectModel.findById(req.params.id)
        project.project_manager.push(...(users_data.project_managers ?? []))
        project.members.push(...(users_data.members ?? []))
        await project.save()
        res.json(project)
    }
    catch(err){ 
        next(err)
    }
}

export {project}