import { AssesmentStatus } from "../enums/AssesmentStatus";
import { Gender } from "../enums/Gender";
import { Model } from "../Model";
import { ApplicantMeeting } from "./ApplicantMeeting";
import { Cv } from "./Cv";


export interface Applicant extends Model {
  id: string;
  name: string;
  surname: string;
  address: string;
  phoneNumber: string;
  nationalId: string;
  gender: Gender;
  CV: Cv;
  hrAssessmentStatus: AssesmentStatus;
  technicalAssessmentStatus: AssesmentStatus;
  hrReview: string;
  technicalReview: string;
  applicantMeeting: ApplicantMeeting;
  createdAt: Date;
  updatedAt: Date;
}
