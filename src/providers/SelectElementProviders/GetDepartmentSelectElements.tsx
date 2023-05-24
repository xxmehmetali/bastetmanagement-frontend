import { useGetSelectElementDepartmentsQuery } from "../../features/api/departmentApi";
import { DepartmentSelectElement } from "../../models/frontdtos/DepartmentSelectElement";
import { DataResult } from "../../results/DataResult";

export function GetDepartmentSelectElements() {
    const { data: selectElementDepartments } = useGetSelectElementDepartmentsQuery();
    const selectElementDepartmentsAsDataResult: DataResult<DepartmentSelectElement[]> = selectElementDepartments as DataResult<DepartmentSelectElement[]>;
    const departmentSelectElementList: DepartmentSelectElement[] = (selectElementDepartmentsAsDataResult?.data) as DepartmentSelectElement[];

    return departmentSelectElementList;
}