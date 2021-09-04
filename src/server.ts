require('dotenv').config();

import 'reflect-metadata';
import './utils/connection';
import express from 'express';
import http from 'http';
import cors from 'cors';

import { ApolloServer } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { buildSchema } from 'type-graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { CategoryResolver } from './graphql/category';
import { MovieResolver } from './graphql/movie';
import { MovieNotificationResolver } from './graphql/subscription/Movie';

async function bootstrap() {
  const app = express();

  const httpServer = http.createServer(app);

  app.use(cors({ origin: '*' }));

  const schema = await buildSchema({
    resolvers: [CategoryResolver, MovieResolver, MovieNotificationResolver],
  });

  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });
  await server.start();

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: server.graphqlPath,
    }
  );

  server.applyMiddleware({
    app,
    cors: false,
  });

  httpServer.listen(process.env.PORT, () =>
    console.log(
      `Server is now running on http://localhost:${process.env.PORT}/graphql`
    )
  );
}

bootstrap();
