import { useGetSelectElementOccupationsQuery } from "../../features/api/ocupationApi";
import { Occupation } from "../../models/base/Occupation";
import { OccupationSelectElement } from "../../models/frontdtos/OccupationSelectElement";
import { DataResult } from "../../results/DataResult";


export function GetOccupationSelectElements() {
    const { data: selectElementOccupations } = useGetSelectElementOccupationsQuery();
    const selectElementOccupationsAsDataResult: DataResult<OccupationSelectElement[]> = selectElementOccupations as DataResult<OccupationSelectElement[]>;
    const occupationSelectElementList: OccupationSelectElement[] = (selectElementOccupationsAsDataResult?.data) as OccupationSelectElement[];

    return occupationSelectElementList;
}