import { MeetingTypeEnum } from "../../models/enums/MeetingTypeEnum";

export class meetingInitialValue {
    meetingOwner: object;
    meetingPlatform: object;
    meetingUrl: string;
    beginHour: Date;
    endHour: Date;
    description: string;
    topic: string;
    meetingType: MeetingTypeEnum;

    constructor(
        meetingOwner: object = {id: ""},
        meetingPlatform: object = {id: ""},
        meetingUrl: string = "",
        beginHour: Date = new Date(),
        endHour: Date = new Date(),
        description: string = "",
        topic: string = "",
        meetingType: MeetingTypeEnum = MeetingTypeEnum.OTHER
    ){
        this.meetingOwner = meetingOwner;
        this.meetingPlatform = meetingPlatform;
        this.meetingUrl = meetingUrl;
        this.beginHour = beginHour;
        this.endHour = endHour;
        this.description = description;
        this.topic = topic;
        this.meetingType = meetingType;
    }

    toJSON(){
        return {
                meetingOwner: this.meetingOwner,
                meetingPlatform: this.meetingPlatform,
                meetingUrl: this.meetingUrl,
                beginHour: this.beginHour,
                endHour: this.endHour,
                description: this.description,
                topic: this.topic,
                meetingType: this.meetingType
            };
        
    }
}