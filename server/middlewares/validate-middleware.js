

const validate = (schema) => async (req, res, next)=>{
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body  = parseBody;
        next();
    } catch (err) {
        //const message = err.errors[0].message;
        //console.log(err);
        //res.status(400).json({msg: message});
        //next(message);
        const status = 422;
        const message = "Fill the poperty!";
        const extraDetails = err.errors[0].message;
        const errors = {
            status,
            message,
            extraDetails
        }
        // console.log(errors)
        // //res.status(400).json({msg: err});
        next(errors);
    }
}




module.exports = validate;