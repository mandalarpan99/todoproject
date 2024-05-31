const jwt = require("jsonwebtoken");
const User = require('../model/user-model');

const authMiddleware = async (req, res, next)=>{
    const token = req.header("Authorization");
    if(!token){
        return res.status(401).json({message: "Unauthorzed HTTP, token is not set"});
    }
    //console.log("token from auth middleware", token);
    const jwtToken = token.replace("Bearer", "").trim();
    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        //console.log(isVerified);
        const userdata = await User.findOne({email: isVerified.email}).select({password:0});
        //console.log("from user middleware side",userdata);
        req.user = userdata;
        req.token = token;
        req.userTD = userdata._id;
        next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorzed HTTP, token not provide"});
    }

};





module.exports = authMiddleware;