let express = require('express');
let jobCollection = require('../models/jobModel');
let companyCollection = require('../models/companyModel');

const postJob = async (req, res) => {
    try {
        const { category ,title, description, requirements, salary, location, jobType, position, companyName } = req.body;
        let userEmail = req.email;
        if (!category || !title || !description || !requirements || !salary || !location || !jobType || !position || !companyName) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        }

        let requirementsArray = requirements.split(',');
        let jobDocument = new jobCollection({
            category,
            title,
            description,
            requirements: requirementsArray,
            salary,
            location,
            jobType,
            position,
            company: companyName,
            contactPerson: userEmail,
        });

        //Now save the document :
        await jobDocument.save();

        return res.status(200).json({
            message: "Job Created Successfully",
            jobDocument,
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

const getallAdminPost = async (req, res) => {
    try {
        let userEmail = req.email;

        let jobList = await jobCollection.find({ "contactPerson": userEmail });

        if (jobList.length === 0) {
            return res.status(400).json({
                message: "No Jobs Found",
                success: false,
            });
        }
        return res.status(200).json({
            message: `Jobs List`,
            jobList,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message,
            success: false
        });
    }
}

//----------------------------------------Student API's : ---------------------------------------------//

const getAllStudentPost = async (req, res) => {
    try {
        let jobList = await jobCollection.find({});

        if (jobList.length === 0) {
            return res.status(400).json({
                message: "No Jobs Available",
                success: false,
            })
        }
        return res.status(200).json({
            message: "Overall Job List",
            jobList,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message,
            success: false
        });
    }
}

const getJobByName = async (req, res) => {
    try {
        let title = req.params.title;

        let getJob = await jobCollection.find({ "title": title });
        if (getJob.length===0) {
            return res.status(400).json({
                message: `Job Role : ${title} does not exist!`,
                success: false,
            });
        }

        return res.status(200).json({
            message: "Congratulations! Job Match Found",
            getJob,
            success: true,
        })

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message,
            success: false
        });
    }
}

module.exports = { postJob, getallAdminPost, getAllStudentPost,getJobByName};