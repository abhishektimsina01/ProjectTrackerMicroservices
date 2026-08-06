// we ensure there is authorization of the user in the respoective route
export const authorize = (...role) => {
    return (req, res, next) => {
        // check for the roles and then send the error or trigger next()
        console.log(role)
        if (!role.includes(req.user.role)){
            const err = new Error("you are not allowed")
            err.status = 401
            next(err)
        }
        console.log("u are authorized")
        next()
    }
}