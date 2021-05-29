import express from "express";
import {ApolloServer} from "apollo-server-express";
import dotenv from 'dotenv';
import schema from "./graphql/graphql-schema.js";
import { getContext } from "./helpers/context.js";
import { formatError } from "./helpers/format-error.js";

import mongoose from "mongoose";

dotenv.config();

const db = process.env.MONGODB_URL;

mongoose.connect(db, {
    useNewUrlParser: true,
    autoIndex: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(()=> {
    console.log('Connected to MongoDB')
}).catch((e)=> {
    console.log(e);
})

async function startApolloServer() {
    const server = new ApolloServer({
        schema,
        context: async ({ req }) => {
            const token = req.headers.authorization || '';
            const context = await getContext(req, token);
            return context;
        },
        formatError,
        playground: true,
    });
    await server.start();

    const app = express();

    server.applyMiddleware({ app });
    await new Promise(resolve => app.listen({ port: process.env.PORT }, resolve));
    console.log(`Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
    return { server, app };
}

startApolloServer();