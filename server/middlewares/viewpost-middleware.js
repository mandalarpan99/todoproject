const viewPostmiddleware = async (req, res, next)=>{
    try {
        console.log(req.token)
        res.status(200).json({message:req.token})
    } catch (error) {
        console.log("Token not valid")
        next(error)
    }
}


module.exports = viewPostmiddleware;