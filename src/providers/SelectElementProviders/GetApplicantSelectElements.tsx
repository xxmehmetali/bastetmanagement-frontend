import { useGetSelectElementApplicantsQuery } from "../../features/api/applicantApi";
import { ApplicantSelectElement } from "../../models/frontdtos/ApplicantSelectElement";
import { DataResult } from "../../results/DataResult";

export function GetApplicantSelectElements() {
    const { data: getSelectElementApplicants } = useGetSelectElementApplicantsQuery();
    const selectElementApplicantsAsDataResult: DataResult<ApplicantSelectElement[]> = getSelectElementApplicants as DataResult<ApplicantSelectElement[]>;
    const selectElementApplicans: ApplicantSelectElement[] = (selectElementApplicantsAsDataResult?.data) as ApplicantSelectElement[];

    return selectElementApplicans;
}