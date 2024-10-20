let express = require('express');
let mongoose = require('mongoose');
let validator = require('validator');

const jobSchema = new mongoose.Schema({
    category : {
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    requirements:[{
        type:String
    }],
    salary:{
        type:Number,
        required:true,
    },
    experience : {
        type : String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    jobType:{
        type:String,
        required:true,
    },
    position:{
        type:Number,
        required:true
    },
    company : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true,
    }, //this will store the object Id of the company 
    contactPerson :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required:true,
    }, //This will store the ibejct ID of the Recruiter
    applications:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Application'
        }
    ] //this will hold the list of applicants rather their object ID of application
},{timestamps:true});


const jobModel = new mongoose.model('Job',jobSchema);
module.exports = jobModel;