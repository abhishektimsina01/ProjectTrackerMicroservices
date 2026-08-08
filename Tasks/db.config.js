import mongoose from "mongoose"

const connectDB = async (url) => {
    try{
        console.log(url)
        await mongoose.connect(url)
        console.log("database connected")
    }
    catch(err){
        console.log("error occurred")
        throw (err)
    }
}

export {connectDB}