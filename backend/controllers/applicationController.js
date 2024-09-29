let express = require('express');
let applicationCollection = require('../models/applicationModel');
let jobCollection = require('../models/jobModel');
let userCollection = require('../models/userModel');


const applyJob = async (req, res) => {
    try {
        let userId = req.id;
        let jobId = req.params.jobid;
        if (!jobId) {
            return res.status(400).json({
                message: "Job Id is required",
                success: false,
            })
        }

        //If both found then apply for job :
        //a) Check if user actually applied for the job:
        let response = await applicationCollection.find({ "job": jobId, "applicant": userId });
        if (response.length != 0) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false,
            });
        }

        //b) else create a new document to upload :
        let newapplication = new applicationCollection({
            job: jobId,
            applicant: userId,
        });

        let application = await newapplication.save();

        //now save the application Id to the respective JobId:
        await jobCollection.findByIdAndUpdate(
            jobId,
            { $push: { applications: application._id } },
        );

        //now save this applied application Id to userAppliedJobs:
        await userCollection.findByIdAndUpdate(
            userId,
            { $push: { "profile.appliedJobs": application._id } },
        );

        return res.status(200).json({
            message: "Successfully applied for the job",
            application,
            success: true,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message,
            success: false
        });
    }

}

const getAllAppliedJobs = async (req, res) => {
    try {
        let userId = req.id;

        const applications = await applicationCollection.find({ applicant: userId }).populate({
            path: 'job',
            options : {sort:{createdAt:-1}},
            populate: {
                path: 'company',
                options : {sort:{createdAt:-1}}
            }
        });

        if (applications.length === 0) {
            return res.status(400).json({
                message: "Jobs not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Applied Jobs Found",
            applications,
            success: true,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message,
            success: false
        });
    }

}


const viewApplicants = async(req,res) =>{ //provide jobid to get the idea about the list of applicants registered to that particular job
    try {
        let jobId = req.params.jobid;

        let applications = await applicationCollection.find({job:jobId}).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            path:'applicant'
        }).sort({createdAt:-1});

        if(!applications){
            return res.status(400).json({
                message:"No Applicants Available",
                success:false
            })
        }
        return res.status(200).json({
            message:"Applied applicants List",
            applications,
            success:true,
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message,
            success: false
        });
    }
}

const updateStatus = async (req, res) => {
    try {
        const {status} = req.body;
        if(!status){
            return res.status(400).json({
                message : "Status is missing",
                success:true,
            });
        }
        const applicationId = req.params.id;
    
        let updatedApplication = await applicationCollection.findOneAndUpdate({"_id" : applicationId},
        {$set : {status}},{new:true}).populate({
            path:'job',
            sort:{createdAt:-1},
            populate:{
                path:'company'
            }
        }).populate({
            path:'applicant',
           
        }).sort({createdAt:-1});
    
        if(!updatedApplication){
            return res.status(400).json({
                message : "Application not found",
                success:true,
            });
        }
    
        return res.status(200).json({
            "message" : "Status updated successfully",
            updatedApplication,
            success:true
        });
    
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message,
            success: false
        });
    }
}

module.exports = { applyJob,getAllAppliedJobs,viewApplicants,updateStatus };