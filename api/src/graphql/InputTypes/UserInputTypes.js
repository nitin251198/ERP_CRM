const {
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');


const UserInputType = new GraphQLInputObjectType({
    name: 'UpdateUsernameInput',
    fields: {
        username: { type: GraphQLString }
    }
});

module.exports = { UserInputType };