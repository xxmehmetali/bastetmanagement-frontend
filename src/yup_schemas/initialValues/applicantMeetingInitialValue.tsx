export class applicantMeetingInitialValue {
    meetingPlatform: object;
    beginHour: Date;
    endHour: Date;
    meetingOwner: object;
    applicant: object;

    constructor(
        meetingPlatform: object = { id: "" },
        beginHour: Date = new Date(),
        endHour: Date = new Date(),
        meetingOwner: object = { id: "" },
        applicant: object = { id: "" }
    ) {
        this.meetingPlatform = meetingPlatform;
        this.beginHour = beginHour;
        this.endHour = endHour;
        this.meetingOwner = meetingOwner;
        this.applicant = applicant;
    }

    toJSON(){
        return {
            meetingPlatform: this.meetingPlatform,
            beginHour: this.beginHour,
            endHour: this.endHour,
            meetingOwner: this.meetingOwner,
            applicant: this.applicant
        }
    }

}
