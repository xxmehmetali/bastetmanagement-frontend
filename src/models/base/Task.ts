import { Priority } from "../enums/Priority";
import { TaskStatus } from "../enums/TaskStatus";
import { Model } from "../Model";
import { Context } from "./Context";
import { Employee } from "./Employee";

export interface Task extends Model {
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
