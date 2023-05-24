import { string } from "yup";
import { Model } from "../Model";
import { Employee } from "./Employee";

export interface Department extends Model {
  id: string;
  name: string;
  description: string;
  departmentResponsible: Employee;
  createdAt: Date;
  updatedAt: Date;
}
