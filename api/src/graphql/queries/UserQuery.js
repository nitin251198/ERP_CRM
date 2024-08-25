const {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
} = require('graphql');

const { UserType } = require('../types');
const User = require('../../models/user.model');

const userQuery = {
    type: UserType,
    resolve: async (_, args, context) => {
        console.log("context", context);
        const user = context.user;

        if (!user) {
            throw new Error('Unauthorized');
        }

        console.log("USER", user);
        const userId = context.user._id; // Assuming you have authentication

        const foundUser = await User.findById(userId);
        if (!foundUser) {
            throw new Error('User not found');
        }

        console.log('GET PROFILE', foundUser);
        return foundUser;
    }
};

module.exports = { userQuery };