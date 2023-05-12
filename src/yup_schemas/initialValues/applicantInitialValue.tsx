import { AssesmentStatus } from "../../models/enums/AssesmentStatus";
import { Gender } from "../../models/enums/Gender";

export const applicantInitialValue = {
    name: "",
    surname: "",
    address: "",
    phoneNumber: "",
    nationalId: "",
    gender: Gender.MALE,
    cv: {
        id: ""
    },
    hrAssessmentStatus: AssesmentStatus.NOT_ASSESSED,
    technicalAssessmentStatus: AssesmentStatus.NOT_ASSESSED,
    hrReview: "",
    technicalReview: "",
    applicantMeeting: {
        id: ""
    }
}