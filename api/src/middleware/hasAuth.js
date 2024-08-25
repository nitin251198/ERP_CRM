const jwt = require('jsonwebtoken')
const User = require('../models/user.model');
const ErrorResponse = require('../util/errorResponse');

/**
 * 
 * @param {*} userType ['admin','superadmin'] 
 * @returns 
 */
exports.hasAuthentication = (userType = []) => {

    return async (req, res, next) => {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            console.log("AUTHRIZE TOKEN", req.headers.authorization);
            token = req.headers.authorization.split(" ")[1]
        }

        //Make sure token exist
        if (!token) {
            return next(new ErrorResponse('Not Authorized to access this route', 401))
        }

        try {
            //verify token
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log('DECODE', decode);
            let user;

            user = await User.findById(decode.id);

            if (!user) throw new Error();

            req.user = {
                _id: user._id,
                email: user.email
            };

            next();
        } catch (err) {
            return next(new ErrorResponse('Not Authorized to access this route', 401))
        }
    }
}

//Grant access to role
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.admin.role)) {
            return next(new ErrorResponse(`User role ${req.user.role} is Not Authorized to access this route`, 403))
        }
        next();
    }
}

