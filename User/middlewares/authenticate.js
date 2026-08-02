// we ensure that the user have the token, its valid and if yes then we fetch the user from the database
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const authenticate = async(req, res, next) => {
    try{
        const accessToken = req.cookies.accessToken ?? null
        if(!accessToken){
            const err = new Error("there is no acces token in ")
            err.status = 404
            throw err
        }
        const payload = jwt.verify(accessToken, process.env.access_secret_token)
        console.log(payload)
        // we need to find the user
        next()
    }
    catch(err){
        next(err)
    }

} 