import { Gender } from "../enums/Gender";
import { Model } from "../Model";
import { BranchSimplified } from "./BranchSimplified";
import { DepartmentSimplified } from "./DepartmentSimplified";
import { OccupationSimplified } from "./OccupationSimplified";

export interface EmployeeSimplified extends Model {
  id: string;
  name: string;
  surname: string;
  address: string;
  phoneNumber: string;
  gender: Gender;
  occupation: OccupationSimplified;
  startDate: Date;
  endDate: Date;
  branch: BranchSimplified;
  department: DepartmentSimplified;
}
