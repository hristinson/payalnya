import mongoose from "mongoose";
const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 1, maxlength: 200 },
    description: { type: String, default: "" },
    status: { type: String, enum: ["active", "archived"], default: "active" },
    createdAt: { type: Date, default: Date.now },
    tasksCount: { type: Number, default: 0 },
  },
  { collection: "projects" }
);

export const Project = mongoose.model("Project", projectSchema);

const taskSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    assignee: { type: String, default: "" },
    status: {
      type: String,
      enum: ["todo", "inprogress", "done"],
      default: "todo",
    },

    createdAt: { type: Date, default: Date.now },
  },
  { collection: "tasks" }
);

export const Task = mongoose.model("Task", taskSchema);
