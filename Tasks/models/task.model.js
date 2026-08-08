import mongoose from "mongoose";

const member = new mongoose.Schema({
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


const taskSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : false
    },
    assigned_to : {
        type : project_manager,
        required : true
    },
    assigned_by : {
        type: member,
        required : false
    }
}, {
    timestamps : true,
    versionKey : false
})

const TaskModel = mongoose.model("task", taskSchema)

export {TaskModel}