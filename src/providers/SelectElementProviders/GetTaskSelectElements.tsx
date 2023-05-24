import { useGetSelectElementTasksQuery } from "../../features/api/taskApi";
import { TaskSelectElement } from "../../models/frontdtos/TaskSelectElement";
import { DataResult } from "../../results/DataResult";

export function GetTasksSelectElements() {
    const { data: selectElementTasks } = useGetSelectElementTasksQuery();
    const selectElementTasksAsDataResult: DataResult<TaskSelectElement[]> = selectElementTasks as DataResult<TaskSelectElement[]>;
    const taskSelectElementList: TaskSelectElement[] = (selectElementTasksAsDataResult?.data) as TaskSelectElement[];

    return taskSelectElementList;
}