import { Employee } from "./Employee";
import { Model } from "../Model";

export interface Dayoff extends Model {
    id: string;
    employee: Employee;
    beginDate: Date;
    endDate: Date;
    reason: string;
    isPaid: boolean;
    createdAt: Date;
    updatedAt: Date;
}
 