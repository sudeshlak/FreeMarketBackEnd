const dotenv = require('dotenv');
dotenv.config();
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './graphql/schema';
import { MongoHelper } from './helpers/mongoHelpers';

const app = express();
const mHelper = new MongoHelper();

async function bootstrap(): Promise<void> {
  try {
    await mHelper.initiateMongoConnection();

    const server = new ApolloServer({
      schema,
      validationRules: [depthLimit(7)],
      introspection: true,
      playground: true,
      context: async ({ req }) => {
        return await mHelper.validateUser(req);
      },
    });

    app.use(cors());
    app.use(compression());
    server.applyMiddleware({ app, path: '/graphql' });

    const port = Number(process.env.PORT) || 3002;
    const httpServer = createServer(app);
    httpServer.listen({ port }, (): void =>
      console.log(`\n🚀 GraphQL is now running on http://localhost:${port}/graphql`)
    );
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Promise Rejection:', reason);
});

bootstrap();