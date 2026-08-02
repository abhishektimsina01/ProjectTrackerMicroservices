import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const UserModelSchema = new mongoose.Schema({
    username : { type : String, required : true, unique : true},
    password : {type : String, required : true},
    role : {type : String, enum : ["pm", "developers"], default : "developer"},
    project : {type : String}
}, {
    timestamps : true,
    versionKey : false
})


// run the callback function before the save() function executes
UserModelSchema.pre("save", async (next) => { 
    if(!this.isModified("password")){
        next()
    }
    else{
        this.password = await bcrypt.hash(this.password, 10)
        next()
    }
})

const UserModel = mongoose.model("user", UserModelSchema)

export {UserModel}