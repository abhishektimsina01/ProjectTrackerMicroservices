export const notFound = (req, res, next) => {
    const err = new Error(`${req.originalURL} not found`)
    err.status = 404
    next(err)
}

export const errorHandler = (err, req, res, next) => {
    const message = err.message
    const status = err.status || 404

    res.json({
        success : false,
        message : message,
        status : status
    })
}