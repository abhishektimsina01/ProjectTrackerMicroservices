// we ensure there is authorization of the user in the respoective route
export const authorize = (...role) => {
    return (req, res, next) => {
        // check for the roles and then send the error or trigger next()
    }
}