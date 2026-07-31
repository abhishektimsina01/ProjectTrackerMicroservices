import mongoose from "mongoose";

const UserModelSchema = new mongoose.Schema({

}, {
    timestamps : true,
    versionKey : false
})

const UserModel = mongoose.model("user", UserModelSchema)

export {UserModel}