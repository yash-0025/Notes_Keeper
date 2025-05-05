const User = require('../models/userModel');
const bcrypt = require('bcrypt')
// const { authenticateToken } = require('../utils/token');
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
// res.status(201).json({
//         msg: "Routing works"
//     })
    try {
        const { firstName, lastName, email, password } = await req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                error: true, message: "Please fill complete details"
            });
        }

        const isUser = await User.findOne({
            email: email
        })
        if (isUser) {
            return res.status(400).json({
                error: true,
                message: "User already registered!!"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, email, password: hashedPassword });
        await user.save();

        // const accessToken = authenticateToken(user, process.env.TOKEN_SECRET)

        return res.status(201).json({
            error: false,
            // token:accessToken,
            user,
            message: "User Successfully registered"
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Invalid Email"
        })
    }
}

exports.loginUser = async (req, res) => {
    try {

        const { email, password } = await req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: true,
                message: "Enter your details perfectly!!"
            });
        }
        const user = await User.findOne({
            email: email,
        })
        if (!user) {
            return res.status(400).json({
                error: true,
                message: "User didn't exist"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                error: true,
                message: "Password Incorrect"
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        return res.status(200).json({
            error: false,
            token: token,
            user: {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: user.createdAt,
            },
            message: "User Logged in successfully"
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: true,
            message: "Invalid Credentials"
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const  userId  = await req.user.id;
        const isUser = await User.findById(userId)
        if (!isUser) {
            return res.status(400).json({
                error: true,
                message: "User not found"
            })
        }
        return res.json({
            error: false,
            user: {
                id: isUser._id,
                firstName: isUser.firstName,
                lastName: isUser.lastName,
                email: isUser.email,
                createdAt: isUser.createdAt,
            },
            message: "User retrieved Successfully"
        })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }

}