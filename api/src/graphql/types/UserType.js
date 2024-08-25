const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a User',
    fields: () => ({
        id: {
            type: GraphQLID,
            resolve: (user) => user.id,
        },
        username: {
            type: GraphQLString,
            resolve: (user) => user.username,
        },
        email: {
            type: GraphQLString,
            resolve: (user) => user.email,
        },
        createdAt: {
            type: GraphQLString,
            resolve: (user) => user.createdAt,
        },
        updatedAt: {
            type: GraphQLString,
            resolve: (user) => user.updatedAt,
        },
    }),
});

module.exports = { UserType };