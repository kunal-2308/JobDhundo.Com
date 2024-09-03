const mongoose = require('mongoose');
const validator = require('validator');

const companySchema = new mongoose.Schema({
    companyName : {
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
    },
    website:{
        type:String,
    },
    logo:{
        type:String, //url to company logo ---> Will be implemented using cloudinary
        
    }, 
    createdBy : { //stores the email who created this Company Recruitment
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
},{timestamps:true});

let companyModel = new mongoose.model('Company',companySchema);
module.exports = companyModel;