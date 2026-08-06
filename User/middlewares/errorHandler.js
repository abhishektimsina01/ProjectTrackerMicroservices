// error if the page is not found
const notFound = (req, res, next) =>{
    console.log("there is no any api that u are hitting")
    const err = new Error(`there is no ${req.originalUrl} endpoint available in our backend`)
    err.status = 404
    next(err)
}

const errorHandler = (err, req, res, next) => {
    const message = err.message
    const status = err.status ?? 404
    res.json({
        success : false,
        message : message,
        status : status ,
    })
}

export {notFound, errorHandler}