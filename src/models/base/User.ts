import { Model } from "../Model";
import { Employee } from "./Employee";

export interface User extends Model {
  id: string;

  username: string;

  email: string;

  employee: Employee;
}
