import { Model } from "../Model";
import { EmployeeSimplified } from "./EmployeeSimplified";

export interface DepartmentSimplified extends Model {
  id: string;
  beginDate: Date;
  endDate: Date;
  isPaid: boolean;
  reason: string;
  employee: EmployeeSimplified;
}
