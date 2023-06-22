import { Cv } from "../../models/base/Cv";
import { AssesmentStatus } from "../../models/enums/AssesmentStatus";
import { Gender } from "../../models/enums/Gender";

export class applicantInitialValue {
    id: string;
    name: string;
    surname: string;
    address: string;
    phoneNumber: string;
    nationalId: string;
    gender: Gender;
    cv: object;
    hrAssessmentStatus: AssesmentStatus;
    technicalAssessmentStatus: AssesmentStatus;
    hrReview: string;
    technicalReview: string;
    applicantMeeting: object;

    constructor(
        id: string = "",
        name: string = "",
        surname: string = "",
        address: string = "",
        phoneNumber: string = "",
        nationalId: string = "",
        gender: Gender = Gender.MALE,
        cv: object = { id: "" },
        hrAssessmentStatus: AssesmentStatus = AssesmentStatus.NOT_ASSESSED,
        technicalAssessmentStatus: AssesmentStatus = AssesmentStatus.NOT_ASSESSED,
        hrReview: string = "",
        technicalReview: string = "",
        applicantMeeting: object = { id: "" }
    ) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.nationalId = nationalId;
        this.gender = gender;
        this.cv = cv;
        this.hrAssessmentStatus = hrAssessmentStatus;
        this.technicalAssessmentStatus = technicalAssessmentStatus;
        this.hrReview = hrReview;
        this.technicalReview = technicalReview;
        this.applicantMeeting = applicantMeeting;
    }

    toJSON(){
        return {
            id: this.id,
            name: this.name,
            surname: this.surname,
            address: this.address,
            phoneNumber: this.phoneNumber,
            nationalId: this.nationalId,
            gender: this.gender,
            cv: this.cv,
            hrAssessmentStatus: this.hrAssessmentStatus,
            technicalAssessmentStatus: this.technicalAssessmentStatus,
            hrReview: this.hrReview,
            technicalReview: this.technicalReview,
            applicantMeeting: this.applicantMeeting
        }
    }
}
