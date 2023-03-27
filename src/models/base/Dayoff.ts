import { Employee } from "./Employee";
import { Model } from "../Model";

export interface Dayoff extends Model {
  id: string;
  beginDate: Date;
  endDate: Date;
  isPaid: boolean;
  reason: string;
  employee: Employee;
}
