import { generateAccessAndRefreshToken, generateAccessToken } from "../utils/jwt.js"

const register = (req, res, next) => {
    console.log("this is the register controller")
    res.json(req.body)
    // check for the username
    // if found then send error
    // hash the password
    // save it to the model
    // generate access and refresh token
    // send it as the cookie
}

const login = (req, res, next) => {

    console.log("this is the login controller")
    // check for the username
    // if not found then send error
    // else compare the password if not then error
    // generateAccessAndRefreshToken
    // send it as the cookie
}

const logout = (req, res, next) => {
    console.log("this is the logout controller")
}

const refresh = (req, res, next) => {
    console.log("this is the refresh controller")
    
}

export {register, login, logout, refresh} 