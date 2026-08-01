import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const UserModelSchema = new mongoose.Schema({
    username : { type : String, required : true},
    password : {type : String, required : true},
    project : {type : String}
}, {
    timestamps : true,
    versionKey : false
})


UserModelSchema.pre("save", async (next) => { 
    if(this.isModified("password")){
        next()
    }
    else{
        this.password = await bcrypt.hash(this.password, 10)
        next()
    }

})

const UserModel = mongoose.model("user", UserModelSchema)

export {UserModel}