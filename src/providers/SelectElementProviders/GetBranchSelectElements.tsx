import { useGetSelectElementBranchesQuery } from "../../features/api/branchApi";
import { BranchSelectElement } from "../../models/frontdtos/BranchSelectElement";
import { DataResult } from "../../results/DataResult";

export function GetBranchSelectElements() {
    const { data: selectElementBranches } = useGetSelectElementBranchesQuery();
    const selectElementBranchesAsDataResult: DataResult<BranchSelectElement[]> = selectElementBranches as DataResult<BranchSelectElement[]>;
    const branchSelectElementList: BranchSelectElement[] = (selectElementBranchesAsDataResult?.data) as BranchSelectElement[];

    return branchSelectElementList;
}