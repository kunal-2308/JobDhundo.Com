let express = require('express');
let jobCollection = require('../models/jobModel');
let companyCollection = require('../models/companyModel');

const postJob = async (req, res) => {
    try {
        const { category, title, description, requirements, salary, experience, location, jobType, position, companyId } = req.body;
        let userId = req.id;
        if (!category || !title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
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
            experience,
            position,
            company: companyId,
            contactPerson: userId,
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
        let userId = req.id;

        let jobList = await jobCollection.find({ "contactPerson": userId });

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
        let keyword = req.query.keyword || "";

        let query = {
            $or: [
                { "title": { $regex: keyword, $options: "i" } },
                { "description": { $regex: keyword, $options: "i" } },
                { "category": { $regex: keyword, $options: "i" } },
                {"requirements" : {$regex : keyword,$options:"i"}},
            ]
        }

        const jobList = await jobCollection.find(query).populate({
            path:"company"
        }).populate({path:'contactPerson'}).sort({createdAt:-1});

        if(jobList.length===0){
            return res.status(400).json({
                message : "Job not found",
                success:false,
            });
        }

        return res.status(200).json({
            message:"Congratulations! Job Match Found",
            success:true,
            jobList
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message,
            success: false
        });
    }
}


module.exports = { postJob, getallAdminPost, getAllStudentPost};