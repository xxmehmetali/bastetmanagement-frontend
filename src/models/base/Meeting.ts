import { Model } from "../Model";
import { MeetingTypeEnum } from "../enums/MeetingTypeEnum";
import { Employee } from "./Employee";
import { MeetingPlatform } from "./MeetingPlatform";

export interface Meeting extends Model {
  id: string;
  meetingOwner: Employee;
  description: string;
  topic: string;
  meetingPlatform: MeetingPlatform;
  meetingType: MeetingTypeEnum;
  meetingUrl: string;
  beginHour: Date;
  endHour: Date;
  createdAt: Date;
  updatedAt: Date;
}
