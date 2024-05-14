const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

dotenv.config();

const MONGO_URL = process.env.MONGO_URI;

const db = {
  Task: require("./model/task"), // Ensure you have your Task model defined
};

const startServer = async () => {
  const app = express();

  // Initialize Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ _ }) => ({
      db,
    }),
  });

  await server.start();
  server.applyMiddleware({ app });

  // Connect to MongoDB
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to DB");

    app.listen(8080, () => {
      console.log(
        "Server running on http://localhost:8080" + server.graphqlPath
      );
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

startServer();
