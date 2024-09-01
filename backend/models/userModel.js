const mongoose = require('mongoose');
const validator = require('validator');

const userScehma = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            let response = validator.isEmail(value);
            if (response == false) {
                throw new Error("Enter a valid email Address");
            }
        }
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            let response = validator.isStrongPassword(value);
            if (response == false) {
                throw new Error("Enter A Strong Password!");
            }
        }
    },
    role: {
        type: String,
        enum: ['Student', 'Recruiter'],
        required: true,
    },
    profile: {
        bio: {
            type: String,
        },
        skills: [{ type: String }],
        resume: {
            type: String //will store the url of the resume 
        },
        resumeName: {
            type: String
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
             //this shows the reference to the company and will store the objectID of company 
        },
        profilePhoto : {
            type:String,
            default:""
        }
    }
},{timestamps:true});

const userModel = new mongoose.model('User',userScehma);
module.exports = userModel;

