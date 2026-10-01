// controllers/usersController/login.Controller.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../Models/Admin.model");

const loginUser = async (req, res) => {
    try {
        const { mobile, password } = req.body || {};


        if (!mobile || !password) {
            return res.status(400).json({
                message: "মোবাইল নম্বর ও পাসওয়ার্ড দিন",
            });
        }


        const user = await User.findOne({
            mobile: mobile.trim(),
        });

        if (!user) {
            return res.status(401).json({
                message: "মোবাইল নম্বর অথবা পাসওয়ার্ড ভুল",
            });
        }


        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "মোবাইল নম্বর অথবা পাসওয়ার্ড ভুল",
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                mobile: user.mobile,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );


        return res.status(200).json({
            message: "লগইন সফল হয়েছে",
            token,
            user: {
                id: user._id,
                name: user.name,
                mobile: user.mobile,
            },
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            message: "সার্ভারের সমস্যা হয়েছে",
        });
    }
};

module.exports = loginUser;