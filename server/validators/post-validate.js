const {z} = require("zod");



//Registration validator
const postdata = z.object ({
    custid: z
    .string({required_error: "Customer id must be needed"})
    .trim(),
    title: z
    .string({required_error: "Write a title"})
    .trim()
    .min(3, {message: "Title must be minimum three characters"}),
    post: z
    .string({required_error: "Subjects must be needed"})
    .trim()
    .min(5,{message:"Subjects must be in five characters"})
    
} );


module.exports = {postdata};