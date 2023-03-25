import { Employee } from "./Employee";

export interface Dayoff {
  id: string;
  beginDate: Date;
  endDate: Date;
  isPaid: boolean;
  reason: string;
  employee: Employee;
}
