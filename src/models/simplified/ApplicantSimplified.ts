import { Model } from "../Model";
import { Gender } from "../enums/Gender";
import { AssesmentStatus } from "../enums/AssesmentStatus";

export interface ApplicantSimplified extends Model {
  id: number;
  name: string;
  surname: string;
  address: string;
  phoneNumber: string;
  gender: Gender;
  hrAssessmentStatus: AssesmentStatus;
  technicalAssessmentStatus: AssesmentStatus;
  hrReview: string;
  technicalReview: string;
}
