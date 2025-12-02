export interface Project {
  id: string;
  name: string;
  _id?: string;
}

export interface Task {
  projectId: string;
  title: string;
  assignee?: string;
  status: "todo" | "inprogress" | "done";
  dueDate: string;
}
