import { MeetingPlatformSimplified } from "../simplified/MeetingPlatformSimplified";
import { EmployeeSimplified } from "../simplified/EmployeeSimplified";

import { Model } from "../Model";

export interface ApplicantMeetingSimplified extends Model {
  id: string;
  meetingPlatform: MeetingPlatformSimplified;
  beginHour: Date;
  endHour: Date;
  meetingOwner: EmployeeSimplified;
}
