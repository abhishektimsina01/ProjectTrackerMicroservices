import mongoose from "mongoose";

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
        type : [{   
                    _id : false,
                    project_manager_id : { type : String, required : true},
                    username : {type : String, required : true}
                }],
        required : false
    },
    members : {
        type: [{
                    _id : false,
                    member_id: {type : String, required : true},
                    username : {type: String, required : true},
        }],
        required : false
    }
}, {
    timestamps : true,
    versionKey : false
})

const ProjectModel = mongoose.model("project", projectSchema)

export {ProjectModel}