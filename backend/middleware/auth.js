let express = require('express');
let jwt = require('jsonwebtoken');


let authenticate = async (req, res, next) => {
    try {
        let token = req.cookies.jwt_login;
        if (!token) {
            return res.status(400).json({
                message: "Un-Authorised Access",
                success: false,
            });
        }

        let decodeToken = jwt.verify(token, process.env.SECRET_KEY);
        if (!decodeToken) {
            return res.status(400).json({
                message: "Invalid Token",
                success: false,
            });
        }
        let userId = decodeToken._id;
        req.id = userId;

        next();
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message,
            success: false
        });
    }
}

module.exports = authenticate;