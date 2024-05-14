const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  enum Status {
    TODO
    DOING
    DONE
  }

  type Task {
    id: ID!
    title: String!
    description: String
    status: Status!
    dueDate: Date!
  }

  type Query {
    tasks: [Task!]!

    task(id: ID!): Task
  }

  type Mutation {
    createTask(title: String!, description: String, status: Status): Task!

    updateTask(
      id: ID!
      title: String
      description: String
      status: Status
    ): Task!

    deleteTask(id: ID!): Task!
  }
`;

module.exports = typeDefs;
