import { Model } from "../Model";
import { EmployeeSimplified } from "./EmployeeSimplified";

export interface MeetingSimplified extends Model {
  id: string;
  meetingOwner: EmployeeSimplified;
  meetingUrl: string;
  beginHour: Date;
  endHour: Date;
}
