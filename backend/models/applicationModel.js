const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');

const applicationSchema = new mongoose.Schema({
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Job',
        required:true,
    },
    applicant : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required:true,
    },
    status:{
        type:String,
        enum : ['Pending','Selected','Rejected'],
        default:'Pending'
    }
},{timestamps:true}); 

let applicationModel = new mongoose.model('Application',applicationSchema);
module.exports = applicationModel;
