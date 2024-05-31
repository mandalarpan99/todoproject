const {Schema, model} = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerShema = Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

//encrypt password 
registerShema.pre("save", async function(next){
    // console.log("Pre data", this);
    const user = this;
    if(!user.isModified("password")){
        next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;


    } catch (error) {
        next(error);
    }
})


// to compare password
registerShema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}


//Generate token for authentication
registerShema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userID: this._id.toString(),
            email: this.email,
        },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d"
            }
        )
    } catch (error) {
        console.log(error)
        console.error(error)
    }
}


const registerData = new model("userRegister", registerShema);

module.exports = registerData;