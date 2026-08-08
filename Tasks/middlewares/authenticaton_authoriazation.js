// we ensure that the user have the token, its valid and if yes then we fetch the user from the database
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const authenticate = async(req, res, next) => {
    try{
        const accessToken = req.cookies?.accessToken
        if(!accessToken){
            err.status = 404
            throw err
        }
        const {_id, username, role} = jwt.verify(accessToken, process.env.access_secret_token)
        req.user = { _id, username, role}
        next()
    }
    catch(err){
        console.log(err.name)
        next(err)
    }
}


export const authorize = (...role) => {
    return (req, res, next) => {
        // check for the roles and then send the error or trigger next()
        if (!role.includes(req.user.role)){
            const err = new Error("you are not allowed")
            err.status = 401
            next(err)
        }
        next()
    }
}