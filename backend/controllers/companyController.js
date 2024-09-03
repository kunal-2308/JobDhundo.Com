let companyCollection = require('../models/companyModel');

const registerCompany = async (req, res) => {
    try {
        const { Name } = req.body;
        if (!Name) {
            return res.status(400).json({
                message: "Company name is missing",
                success: false
            });
        }

        //Now find if company is registered at start or not:
        let companyResponse = await companyCollection.findOne({ "companyName": Name });

        //If something is found then Company is already Registered
        if (companyResponse) {
            return res.status(400).json({
                message: "Company Already Registered",
                success: false
            });
        }

        //Create New Company Document
        let newCompany = new companyCollection({
            companyName: Name,
            createdBy: req.id,
        });

        let response = await newCompany.save();
        if (!response) {
            return res.status(400).json({
                message: "Registration Failed",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company Registered Successfully",
            Name,
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

const getCompany = async (req, res) => { //from perspetive of the Recruiter
    try {
        let userId = req.id;

        let companyList = await companyCollection.find({ "createdBy" : userId });

        if (companyList.length === 0) {
            return res.status(400).json({
                message: "Companies Not Found",
                success: false,
            });
        }
        
        return res.status(200).json({
            message: "Registered Companies List",
            companyList,
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

const getCompanybyName = async (req, res) => {
    try {
        let companyName = req.params.name;

        let companyDetails = await companyCollection.find({ companyName });

        if (companyDetails.length === 0) {
            return res.status(400).json({
                message: `No result for ${companyName} found!`,
                success: false,
            });
        }

        return res.status(200).json({
            message: `Results found for ${companyName}`,
            companyDetails,
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

const updateCompany = async (req, res) => {
    try {
        let name = req.params.company; //to get the company name when user clicks on edit option:
        let file = req.file;
        let { companyName, description, website } = req.body;

        //cloudinary functions goes here ----->


        const updateData = {
            "companyName": companyName,
            "description": description,
            "website": website,
            //logo will be updated later
        }

        let company = await companyCollection.findOneAndUpdate({ "companyName": name }, { $set: updateData }, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Company Details Updated Successfully",
            success: true,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message,
            success: false
        });
    }
}


const deleteCompany = async (req, res) => {
    try {
        let companyName = req.params.company;

        let company = await companyCollection.findOneAndDelete({ companyName });

        if (!company) {
            return res.status(404).json({
                message: `${companyName} Not Found!`,
                success: false,
            });
        }

        return res.status(200).json({
            message: `${companyName} Deleted Successfully!`,
            company,
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




module.exports = { registerCompany, getCompany, getCompanybyName, updateCompany, deleteCompany }