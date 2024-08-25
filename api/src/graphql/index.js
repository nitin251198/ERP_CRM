const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { userQuery } = require('./queries');
const { updateUser } = require('./mutations');
const { hasAuthentication } = require('../middleware/hasAuth')
const { ApolloServer } = require('apollo-server-express');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'This is the root query which holds all possible READ entrypoints for the GraphQL API',
    fields: {
        userQuery
    },
});

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'This is the root mutation which holds all possible WRITE entrypoints for the GraphQL API',
    fields: {
        updateUser
    },
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});

const applyGraphQLMiddleware = (app) => {
    const graphQLServer = new ApolloServer({
        schema,
        context: async ({ req }) => {

            await new Promise((resolve, reject) => {
                hasAuthentication()(req, {}, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });

            return { user: req.user };
        }
    });

    graphQLServer.start().then(() => {
        graphQLServer.applyMiddleware({
            app: app,
            path: '/graphql',
            cors: {
                origin: true,
                credentials: true
            },
            playground: {
                settings: {
                    'editor.theme': 'light',
                },
            },
        });
    });
};

module.exports = { schema, applyGraphQLMiddleware };