const User = require("../models/user.model");
const ErrorResponse = require('../util/errorResponse');

/**
 * 
 * @desc create User account 
 * @route POST api/v1/users/register
 * @access Public
 */
exports.create = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        console.log(req.body)
        const user = await User.create({ username, email, password });
        sendTokenResponse(user, 200, res, "account has been created successfully !");
    } catch (err) {
        next(err);
    }
}

/** 
 * 
 * @desc login to account
 * @route POST api/v1/users/login
 * @access Public
 */
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //Validate email & password
        if (!email && !password) {
            return next(new ErrorResponse('Please Provide an email and password', 400))
        }

        // Check for user
        const user = await User.findOne({ email: email }).select('+password');
        if (!user) {
            return next(new ErrorResponse('Invalid credentials User not found', 401));
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return next(new ErrorResponse('Invalid credentials', 401));
        }

        sendTokenResponse(user, 200, res, "login  successfully !");
    } catch (err) {
        next(err);
    }
}

/**
 * 
 * @desc Log user out/ clear cookie
 * @route POST api/v1/users/logout
 * @access Private
 */
exports.logout = async (req, res, next) => {
    try {
        res.cookie('token', 'none', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            data: {},
            message: "User logout successfully !"
        })
    } catch (err) {
        next(err);
    }
}

//get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res, message) => {
    //Create Token
    const token = user.getSignedJwtToken();
    const option = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') {
        option.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, option)
        .json({
            success: true,
            token: token,
            message: message
        })
}
