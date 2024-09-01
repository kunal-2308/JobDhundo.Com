let userCollection = require('../models/userModel');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let cookieParser = require('cookie-parser')
// Register user --> AUTH/LOGIN not required
export const register = async (req, res) => {
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
                message: "User Created Successfully!",
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

export const login = async (req, res) => {
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

        //if user exists with this email :
        let pepperPassword = password + process.env.PEPPER;

        //now compare this password with the database password:
        let response = await bcrypt.compare(pepperPassword, user.password);
        if (!response) {
            return res.status(400).json({
                message: "Incorrect Password",
                success: false
            })
        }

        //now compare the role with DB Role :
        if (role != user.role) {
            return res.status(400).json({
                message: "Account with this role doesn't exist",
                success: false
            })
        }

        user = {
            _id:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            role:user.role,
            profile:user.profile
        }

        //Once this layers are passed --> then everything is create login the user and create a token
        const token =  jwt.sign({ _id: user._id },process.env.SECRET_KEY);
        const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

        //once cookie is created whole process is done:
        return res.status(200).cookie('jwt_login',token,{
            maxAge: maxAge,
            httpOnly:true,
            sameSite:'strict'
        }).json({
            message:`Welcome Back ${user.name}`,
            user,
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

export const logout = async(req,res) =>{
    try {
       //clear cookie :
       res.status(200).clearCookie('jwt_login').json({
        message:"Logged Out Successfully",
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