const mongoose = require("mongoose");

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["TODO", "DOING", "DONE"],
      uppercase: true,
    },
    dueDate: {
      type: Date,
      validate: {
        validator: (value) => value >= Date.now(),
        message: (props) => `${props.value} is not a valid due date`,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
