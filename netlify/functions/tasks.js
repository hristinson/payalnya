import { connectToDB } from "./db.js";
import { Task } from "../models/index.js";

export async function handler(event) {
  try {
    await connectToDB();

    const method = event.httpMethod;

    if (method === "GET") {
      const projectId = event.queryStringParameters?.projectId;
      const filter = projectId ? { projectId } : {};
      const tasks = await Task.find(filter).sort({ dueDate: 1 });
      return {
        statusCode: 200,
        body: JSON.stringify(tasks),
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

      if (!data.projectId || !data.title) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Missing required fields" }),
        };
      }

      const task = new Task(data);
      await task.save();

      console.log("Created task:", task);

      return {
        statusCode: 201,
        body: JSON.stringify(task),
      };
    }

    if (method === "PUT") {
      const id = event.path.split("/").pop();
      const data = JSON.parse(event.body);

      const updated = await Task.findByIdAndUpdate(id, data, { new: true });

      return {
        statusCode: 200,
        body: JSON.stringify(updated),
      };
    }

    if (method === "DELETE") {
      const id = event.path.split("/").pop();
      await Task.findByIdAndDelete(id);

      return {
        statusCode: 204,
        body: "",
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
