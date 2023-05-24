import { useGetSelectElementMeetingPlatformsQuery } from "../../features/api/meetingPlatformApi";
import { MeetingPlatformSelectElement } from "../../models/frontdtos/MeetingPlatformSelectElement";
import { DataResult } from "../../results/DataResult";

export function GetMeetingPlatformSelectElements() {
    const { data: selectElementEmployees } = useGetSelectElementMeetingPlatformsQuery();
    const selectElementMeetingPlatformsAsDataResult: DataResult<MeetingPlatformSelectElement[]> = selectElementEmployees as DataResult<MeetingPlatformSelectElement[]>;
    const meetingPlatformSelectElementList: MeetingPlatformSelectElement[] = (selectElementMeetingPlatformsAsDataResult?.data) as MeetingPlatformSelectElement[];

    return meetingPlatformSelectElementList;
}