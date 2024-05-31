const {z} = require("zod");



//Registration validator
const signup = z.object ({
    name: z
    .string({required_error: "Name must be needed"})
    .trim()
    .min(5,{message:"Name must be in five characters"})
    .max(18, {message: "Maximum 18 characters"}),
    email: z
    .string({required_error: "Email must be needed."})
    .trim()
    .email({message : "Enter an email"})
    .min(3, {message: "Email must be minimum three characters"}),
    phone: z.string({required_error: "Number must be needed"})
    .min(10,{message: "Phone must be 10 digits"})
    .max(10,{message: "Phone must be 10 digits"}),
    password: z
    .string({required_error: "password must be needed"})
    .trim()
    .min(5,{message:"Password must be in five characters"})
    .max(18, {message: "Password maximum 18 characters"})
    

} );

//Login validator
const loginSchema = z.object({
    email: z
    .string({required_error: "Email must be needed."})
    .trim()
    .email({message : "Enter an email"})
    .min(3, {message: "Email must be minimum three characters"}),
    password: z
    .string({required_error: "password must be needed"})
    .trim()
    .min(5,{message:"Password must be in five characters"})
    .max(18, {message: "Password maximum 18 characters"})
})




module.exports = {signup, loginSchema};