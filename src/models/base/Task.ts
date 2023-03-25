import { Priority } from "../enums/Priority";
import { TaskStatus } from "../enums/TaskStatus";
import { Context } from "./Context";
import { Employee } from "./Employee";

export interface Task {
  id: string;
  name: string;
  description: string;
  tags: string;
  taskStatus: TaskStatus;
  priority: Priority;
  assignedFrom: Employee;
  assignedTo: Employee;
  reviewer: Employee;
  context: Context;
}
