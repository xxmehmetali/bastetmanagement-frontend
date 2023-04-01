import { Model } from "../Model";
import { Employee } from "./Employee";
import { MeetingPlatform } from "./MeetingPlatform";

export interface Meeting extends Model {
  id: string;
  meetingOwner: Employee;
  meetingPlatform: MeetingPlatform;
  meetingUrl: string;
  beginHour: Date;
  endHour: Date;
}
