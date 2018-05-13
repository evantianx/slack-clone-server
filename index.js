import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import path from "path";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import cors from "cors";
import models from "./models";

const typesArray = fileLoader(path.join(__dirname, "./schema"));
const resolversArray = fileLoader(path.join(__dirname, "./resolvers"));
const typeDefs = mergeTypes(typesArray, { all: true });
const resolvers = mergeResolvers(resolversArray);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const PORT = 3000;
const app = express();
const graphqlEndpoint = "/graphql";

app.use(cors("*"));
app.use(
  graphqlEndpoint,
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      models,
      user: {
        id: 1
      }
    }
  })
);

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: graphqlEndpoint
  })
);

models.sequelize.sync().then(() => {
  app.listen(PORT);
});
