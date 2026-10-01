const bcrypt = require("bcryptjs");
const User = require("../../Models/Admin.model");

const registerUser = async (req, res) => {
    try {
        const { name, mobile, password } = req.body;

        // সব তথ্য আছে কিনা
        if (!name || !mobile || !password) {
            return res.status(400).json({
                message: "নাম, মোবাইল নম্বর ও পাসওয়ার্ড প্রয়োজন",
            });
        }

        // Mobile number validation
        const mobileRegex = /^01[3-9]\d{8}$/;

        if (!mobileRegex.test(mobile)) {
            return res.status(400).json({
                message: "সঠিক মোবাইল নম্বর দিন",
            });
        }

        // Password validation
        if (password.length < 6) {
            return res.status(400).json({
                message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে",
            });
        }

        // আগে থেকেই user আছে কিনা
        const existingUser = await User.findOne({ mobile });

        if (existingUser) {
            return res.status(409).json({
                message: "এই মোবাইল নম্বর দিয়ে ইতোমধ্যে অ্যাকাউন্ট তৈরি করা হয়েছে",
            });
        }

        // Password hash
        const hashedPassword = await bcrypt.hash(password, 10);

        // নতুন user
        const newUser = new User({
            name: name.trim(),
            mobile: mobile.trim(),
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({
            message: "রেজিস্ট্রেশন সফল হয়েছে",
            user: {
                id: newUser._id,
                name: newUser.name,
                mobile: newUser.mobile,
            },
        });

    } catch (error) {
        console.error("Registration Error:", error);

        return res.status(500).json({
            message: "সার্ভারের সমস্যা হয়েছে",
        });
    }
};

module.exports = {
    registerUser,
};