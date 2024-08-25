const { GraphQLNonNull } = require('graphql');
const { UserType } = require('../types');
const User = require('../../models/user.model');
const { UserInputType } = require('../InputTypes');

const updateUser = {
    type: UserType,
    description: 'The mutation that allows you to update an existing User by Id',
    args: {
        input: { type: new GraphQLNonNull(UserInputType) }
    },

    resolve: async (_, { input }, context) => {
        console.log("INPUT CONTEXT", input, context);
        const { username } = input;
        const user = context.user;

        if (!user) {
            throw new Error('Unauthorized');
        }

        const foundUser = await User.findById(user._id);

        if (!foundUser) {
            throw new Error(`User with id: ${user._id} not found!`);
        }

        const updatedUser = await User.findByIdAndUpdate(
            foundUser.id,
            { username },
            { new: true } // Return the updated user
        );

        return updatedUser;
    },
};

module.exports = {
    updateUser
};