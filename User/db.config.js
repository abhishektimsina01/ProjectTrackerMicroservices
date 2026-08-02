import mongoose from "mongoose"

export const connectDB = async(url) => {
    try{
        await mongoose.connect(url)
        console.log("database connected")
    }
    catch(err){
        console.log("error occurred")
        throw (err)
    }
}