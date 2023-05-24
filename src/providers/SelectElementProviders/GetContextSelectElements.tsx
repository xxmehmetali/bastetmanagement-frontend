import { useGetSelectElementContextsQuery } from "../../features/api/contextApi";
import { ContextSelectElement } from "../../models/frontdtos/CotextSelectElement";
import { DataResult } from "../../results/DataResult";

export function GetContextsSelectElements() {
    const { data: selectElementTasks } = useGetSelectElementContextsQuery();
    const selectElementContextsAsDataResult: DataResult<ContextSelectElement[]> = selectElementTasks as DataResult<ContextSelectElement[]>;
    const contextSelectElementList: ContextSelectElement[] = (selectElementContextsAsDataResult?.data) as ContextSelectElement[];

    return contextSelectElementList;
}