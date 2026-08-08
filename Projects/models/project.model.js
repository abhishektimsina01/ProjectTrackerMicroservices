import mongoose from "mongoose";

const members = new mongoose.Schema({
    _id : {type : String, required : true},
    username : {type: String, required : true},
},{
    timestamps : false,
    versionKey : false,
    _id : false
})


const project_manager = new mongoose.Schema({
    _id : {type : String, required : true},
    username : {type: String, required : true},
},{
    timestamps : false,
    versionKey : false,
    _id : false
})


const projectSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : false
    },
    project_manager : {
        type : [project_manager],
        required : false
    },
    members : {
        type: [members],
        required : false
    }   
}, {
    timestamps : true,
    versionKey : false
})

const ProjectModel = mongoose.model("project", projectSchema)

export {ProjectModel}