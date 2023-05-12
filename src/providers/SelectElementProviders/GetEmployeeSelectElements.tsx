import { useGetSelectElementEmployeesQuery } from "../../features/api/employeeApi";
import { EmployeeSelectElement } from "../../models/frontdtos/EmployeeSelectElement";
import { DataResult } from "../../results/DataResult";

export function GetEmployeeSelectElements() {
    const { data: selectElementEmployees } = useGetSelectElementEmployeesQuery();
    const selectElementEmployeesAsDataResult: DataResult<EmployeeSelectElement[]> = selectElementEmployees as DataResult<EmployeeSelectElement[]>;
    const employeeSelectElementList: EmployeeSelectElement[] = (selectElementEmployeesAsDataResult?.data) as EmployeeSelectElement[];

    return employeeSelectElementList;
}