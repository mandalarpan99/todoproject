const {Schema, model} = require('mongoose');


const postShema = Schema({
    custid:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    post:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    
})




const postData = new model("Userpost", postShema);

module.exports = postData;