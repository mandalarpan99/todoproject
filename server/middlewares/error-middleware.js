const errorMiddleware = (err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "Back-end Error";
    const extraDetails = err.extraDetails || "Server not reacheble";

    return res.status(status).json({message,extraDetails});

}




module.exports = errorMiddleware;