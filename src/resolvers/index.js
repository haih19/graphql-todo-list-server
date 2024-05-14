const { ApolloError } = require("apollo-server-express");

const Task = require("../model/task");

const resolvers = {
  Query: {
    tasks: async (_, __, { db }) => {
      try {
        const tasks = await db.Task.find();
        return tasks;
      } catch (error) {
        console.error("Error fetching tasks:", error);
        throw new ApolloError("Failed to fetch tasks", "FETCH_ERROR");
      }
    },
    task: async (_, { id }, { db }) => {
      try {
        const task = await db.Task.findById(id);
        if (!task) throw new ApolloError("Task not found", "NOT_FOUND");
        return task;
      } catch (error) {
        console.error("Error fetching task:", error);
        throw new ApolloError("Failed to fetch task", "FETCH_ERROR");
      }
    },
  },
  Mutation: {
    createTask: async (_, { title, description, status }, { db }) => {
      try {
        const task = new db.Task({
          title,
          description,
          status: status || "TODO",
        });

        await task.save();
        return task;
      } catch (error) {
        console.error("Error creating task:", error);
        throw new ApolloError("Failed to create task", "CREATE_ERROR");
      }
    },
    updateTask: async (_, { id, title, description, status }, { db }) => {
      try {
        const updateFields = {};
        if (title !== undefined) updateFields.title = title;
        if (description !== undefined) updateFields.description = description;
        if (status !== undefined) updateFields.status = status;

        const task = await db.Task.findByIdAndUpdate(id, updateFields, {
          new: true,
        });

        if (!task) throw new ApolloError("Task not found", "NOT_FOUND");
        return task;
      } catch (error) {
        console.error("Error updating task:", error);
        throw new ApolloError("Failed to update task", "UPDATE_ERROR");
      }
    },
    deleteTask: async (_, { id }, { db }) => {
      try {
        const task = await db.Task.findByIdAndDelete(id);
        if (!task) throw new ApolloError("Task not found", "NOT_FOUND");
        return task;
      } catch (error) {
        console.error("Error deleting task:", error);
        throw new ApolloError("Failed to delete task", "DELETE_ERROR");
      }
    },
  },
};

module.exports = resolvers;
