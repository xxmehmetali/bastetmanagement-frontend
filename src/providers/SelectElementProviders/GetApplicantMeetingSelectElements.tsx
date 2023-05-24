import { useGetSelectElementApplicantMeetingsQuery } from "../../features/api/applicantMeetingApi";
import { ApplicantMeetingSelectElement } from "../../models/frontdtos/ApplicantMeetingSelectElement";
import { DataResult } from "../../results/DataResult";

export function GetApplicantMeetingSelectElements() {
    const { data: getSelectElementApplicantMeetings } = useGetSelectElementApplicantMeetingsQuery();
    const selectElementApplicantMeetingsAsDataResult: DataResult<ApplicantMeetingSelectElement[]> = getSelectElementApplicantMeetings as DataResult<ApplicantMeetingSelectElement[]>;
    const selectElementApplicantMeetings: ApplicantMeetingSelectElement[] = (selectElementApplicantMeetingsAsDataResult?.data) as ApplicantMeetingSelectElement[];

    return selectElementApplicantMeetings;
}