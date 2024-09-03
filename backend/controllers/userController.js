let userCollection = require('../models/userModel');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        let { name, email, phone, password, role } = req.body;

        // Check if all required fields are present
        if (!name || !email || !phone || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        }

        // Check if a user with this email is already registered
        let user = await userCollection.findOne({ "email": email }, { _id: 1, name: 1 });
        if (user) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
            });
        }

        //if no user found lets start with processing of the hasing of the passsword
        let pepperPassword = password + process.env.PEPPER;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pepperPassword, salt);

        //now creating a user Document
        let userDoc = new userCollection({
            name: name,
            email: email,
            phone: phone,
            password: hashedPassword,
            role: role
        });

        //Saving the user Document created to the userCollection:
        let response = await userDoc.save();

        //send the response if the user created successfully
        if (response) {
            res.status(200).json({
                message: "Account Created Successfully!",
                success: true,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message,
            success: false
        });
    }
};

const login = async (req, res) => {
    try {
        let { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }

        //now find if the user with this email exists in the Database
        let user = await userCollection.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found!",
                success: false
            });
        }

        //if user does not exists with this email :
        let pepperPassword = password + process.env.PEPPER;

        //now compare this password with the database password:
        let response = await bcrypt.compare(pepperPassword, user.password);
        if (!response) {
            return res.status(400).json({
                message: "Incorrect Password",
                success: false
            });
        }

        //now compare the role with DB Role :
        if (role != user.role) {
            return res.status(400).json({
                message: "Account with this role doesn't exist",
                success: false
            })
        }

        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profile: user.profile
        }

        //Once this layers are passed --> then everything is create login the user and create a token
        const token = jwt.sign({ _id:user._id }, process.env.SECRET_KEY);
        const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

        //once cookie is created whole process is done:
        return res.status(200).cookie('jwt_login', token, {
            maxAge: maxAge,
            httpOnly: true,
            sameSite: 'strict'
        }).json({
            message: `Welcome Back ${user.name}`,
            user,
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

const logout = async (req, res) => {
    try {
        //clear cookie :
        res.status(200).clearCookie('jwt_login').json({
            message: "Logged Out Successfully",
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


const updateUser = async (req, res) => {
    try {
        const { name, email, phone, bio, skills, replaceSkills } = req.body;
        let file = req.file;
        if (!name || !email || !phone || !bio) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        //cloudinary setup :



        //Now the skills will be in string format: Convert it to array
        let skillsArray;
        if (skills) {
            skillsArray = skills.split(',');
        }


        //using middleware : Authentication
        let userId = req.id;

        let user = await userCollection.findOne({"_id": userId});

        if (!user) {
            return res.status(400).json({
                message: "User Not found",
                success: false,
            });
        }

        //update the user document;
        user.name = name;
        user.email = email;
        user.phone = phone,
        user.profile.bio = bio;

        //during frontEnd keep it properly as by default false
        // And then add seetting to change it by making it true
        if (skills) {
            if (replaceSkills) {
                user.profile.skills = skillsArray;
            } else {
                user.profile.skills = user.profile.skills.concat(skillsArray)
            }
        }

        //resume section :

        //Now save this updated data to the database:
        await user.save();

        //check for updated data:
        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile Updated Successfully",
            user,
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

const deleteUser = async (req, res) => {
    try {
        await res.clearCookie('jwt_login');
        let userId = req.id;
        let response = await userCollection.findOneAndDelete({ "_id": userId });
        if(!response){
            return res.status(400).json({
                message:"User not found",
                success : false,
            });
        }
        return res.status(200).json({
            message: "Account Deleted Successfully",
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

module.exports = { register, login, updateUser, logout, deleteUser };