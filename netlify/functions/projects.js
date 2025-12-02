import { connectToDB } from "./db.js";
import { Project, Task } from "../models/index.js";

export async function handler(event) {
  try {
    await connectToDB();

    const method = event.httpMethod;

    if (method === "GET") {
      const projects = await Project.find().sort({ createdAt: -1 });
      return {
        statusCode: 200,
        body: JSON.stringify(projects),
      };
    }

    if (method === "POST") {
      console.log("POST body raw:", event.body);

      let data;
      try {
        data = JSON.parse(event.body);
      } catch (err) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Invalid JSON in request body" }),
        };
      }

      const project = new Project(data);
      await project.save();

      console.log("Created project:", project);

      return {
        statusCode: 201,
        body: JSON.stringify(project),
      };
    }

    if (method === "PUT") {
      const id = event.path.split("/").pop();
      const data = JSON.parse(event.body);

      const updated = await Project.findByIdAndUpdate(id, data, { new: true });

      return {
        statusCode: 200,
        body: JSON.stringify(updated),
      };
    }

    if (method === "DELETE") {
      const id = event.path.split("/").pop();

      if (!id) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Project ID is required" }),
        };
      }

      await Task.deleteMany({ projectId: id });
      await Project.findByIdAndDelete(id);

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Проект та всі завдання видалено" }),
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  } catch (err) {
    console.error("Handler error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
