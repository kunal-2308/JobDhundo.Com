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

const getAllJobPost = async (req, res) => {
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

const getJobs = async(req,res)=>{
    try {
        // Extract search filters from query params
        let keyword = req.query.keyword || "";
        let location = req.query.location || "";
        let role = req.query.role || "";
        let jobType = req.query.jobType || "";

        // Create a base query with the keyword search
        let query = {
            $and: [
                {
                    $or: [
                        { "title": { $regex: keyword, $options: "i" } },
                        { "description": { $regex: keyword, $options: "i" } },
                        { "category": { $regex: keyword, $options: "i" } },
                        { "requirements": { $regex: keyword, $options: "i" } },
                    ]
                }
            ]
        };

        // Add location filter if provided
        if (location !== "" && location !== "All") {
            query.$and.push({ "location": { $regex: location, $options: "i" } });
        }

        // Add role filter if provided
        if (role !== "" && role !== "All") {
            query.$and.push({ "title": { $regex: role, $options: "i" } });
        }

        // Add job type filter if provided
        if (jobType !== "" && jobType !== "All") {
            query.$and.push({ "jobType": { $regex: jobType, $options: "i" } });
        }

        // Fetch the filtered job listings
        const jobList = await jobCollection.find(query)
            .populate({
                path: "company",
                select: "companyName website description", // Specify which fields to populate
            })
            .populate({ path: 'contactPerson' })
            .sort({ createdAt: -1 });

        // If no jobs match the filters, return a 404 response
        if (jobList.length === 0) {
            return res.status(404).json({
                message: "No jobs match your search criteria",
                success: false,
            });
        }

        // Return the matched job list
        return res.status(200).json({
            message: "Job match(es) found",
            success: true,
            jobList
        });
    } catch (error) {
        // Handle server error
        return res.status(500).json({
            message: "Server Error",
            success: false,
            error: error.message
        });
    }
}


const updateJob = async(req,res) =>{
    try {
        let jobId = req.params.jobid;
        let {description,salary,experience,location,jobType,position} = req.body;
    
        if(!description || !salary || !experience || !location || !jobType || !position){
            return res.status(400).json({
                message : "Something is missing",
                success:false,
            });
        }
    
        let updatedData = {
            description,
            salary,
            experience,
            location,
            jobType,
            position
        }
    
        let updatedJob = await jobCollection.findByIdAndUpdate({_id:jobId},{$set:updatedData},{
            new:true,
        });
    
        if (updatedJob) {
            return res.status(200).json({
                message : "Job updated successfully",
                updatedJob,
                success:true,
            })
        }
    
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message,
            success: false
        });
    }
}

const getJobById = async (req, res) => {
    try {
        let jobId = req.params.id;
        let jobDetails = await jobCollection.findById({"_id":jobId})
            .populate({ path: 'company' })        
            .populate({ path: 'contactPerson' });

        if (!jobDetails) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job Found!",
            success: true,
            jobDetails
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message,
            success: false
        });
    }
};

module.exports = { postJob, getallAdminPost, getAllStudentPost,updateJob, getAllJobPost,getJobById,getJobs};