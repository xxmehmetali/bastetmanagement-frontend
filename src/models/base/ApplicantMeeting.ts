import { Model } from "../Model";
import { Employee } from "./Employee";
import { MeetingPlatform } from "./MeetingPlatform";

export interface ApplicantMeeting extends Model {
    id: string;
    meetingPlatform: MeetingPlatform;
    beginHour: Date;
    endHour: Date;
    meetingOwner: Employee;
    createdAt: Date;
    updatedAt: Date;
  }
