import { useGetSelectElementCorporationsQuery } from "../../features/api/corporationApi";
import { Corporation } from "../../models/base/Corporation";
import { DataResult } from "../../results/DataResult";

export function GetCorporationSelectElements() {
    const { data: selectElementCorporations } = useGetSelectElementCorporationsQuery();
    const selectElementCorporationsAsDataResult: DataResult<Corporation[]> = selectElementCorporations as DataResult<Corporation[]>;
    const corporationSelectElementList: Corporation[] = (selectElementCorporationsAsDataResult?.data) as Corporation[];

    return corporationSelectElementList;
}