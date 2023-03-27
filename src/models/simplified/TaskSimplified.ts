import { Employee } from "../base/Employee";
import { Priority } from "../enums/Priority";
import { TaskStatus } from "../enums/TaskStatus";
import { Model } from "../Model";
import { EmployeeSimplified } from "./EmployeeSimplified";

export interface TaskSimplified extends Model {
  id: string;
  name : string;
  description: string;
  tags: string;
  taskStatus : TaskStatus;
  priority: Priority;
  assignedFrom : EmployeeSimplified;
  assignedTo: EmployeeSimplified;
  reviewer: EmployeeSimplified;
  }
  