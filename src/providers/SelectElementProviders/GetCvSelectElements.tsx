import { useGetSelectElementCvsQuery } from "../../features/api/cvApi";
import { CvSelectElement } from "../../models/frontdtos/CvSelectElement";
import { DataResult } from "../../results/DataResult";

export function GetCvSelectElements() {
    const { data: selectElementCvs } = useGetSelectElementCvsQuery();
    const selectElementCvsAsDataResult: DataResult<CvSelectElement[]> = selectElementCvs as DataResult<CvSelectElement[]>;
    const cvSelectElementList: CvSelectElement[] = (selectElementCvsAsDataResult?.data) as CvSelectElement[];

    return cvSelectElementList;
}