import { Formik } from 'formik';
import { OccupationSelectElement } from '../../../models/frontdtos/OccupationSelectElement';
import { GetOccupationSelectElements } from '../../../providers/SelectElementProviders/GetOccupationSelectElements';
import { GetBranchSelectElements } from '../../../providers/SelectElementProviders/GetBranchSelectElements';
import { GetDepartmentSelectElements } from '../../../providers/SelectElementProviders/GetDepartmentSelectElements';
import { GetCurrencySelectElements } from '../../../providers/SelectElementProviders/GetCurrencySelectElements';
import { BranchSelectElement } from '../../../models/frontdtos/BranchSelectElement';
import { DepartmentSelectElement } from '../../../models/frontdtos/DepartmentSelectElement';
import { CurrencySelectElement } from '../../../models/frontdtos/CurrencySelectElement';
import { employeeInitialValue } from '../../../yup_schemas/initialValues/employeeInitialValue';
import * as yup from "yup";
import { Gender } from '../../../models/enums/Gender';
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../../components/customFormElements/CustomInput';
import CustomSelect from '../../../components/customFormElements/CustomSelect';
import { ToTitleCase } from '../../../functions/ToTitleCase';
import { useGetEmployeeByIdQuery, useUpdateEmployeeMutation } from '../../../features/api/employeeApi';
import { useParams } from 'react-router-dom';
import { Employee } from '../../../models/base/Employee';
import { DataResult } from '../../../results/DataResult';

export default function EmployeeUpdate() {
    const [updateEmployee, { isLoading: isLoadingX }] = useUpdateEmployeeMutation();
    async function onSubmit(values: any, actions: any) {
        const result = await updateEmployee(values)
        // actions.resetForm();
        // ResolveResult(result)
    }

    let { id } = useParams();

    const { data: employeeDataResultDataForEmployee } = useGetEmployeeByIdQuery(id || "");
    const employeeDataResultForEmployee: DataResult<Employee> = employeeDataResultDataForEmployee as DataResult<Employee>;
    const employee: Employee = (employeeDataResultForEmployee?.data) as Employee;

    const occupationSelectElementList: OccupationSelectElement[] = GetOccupationSelectElements();
    const branchSelectElementList: BranchSelectElement[] = GetBranchSelectElements();
    const departmentSelectElementList: DepartmentSelectElement[] = GetDepartmentSelectElements();
    const currencySelectElementList: CurrencySelectElement[] = GetCurrencySelectElements();
    return (
        <>
            {
            employee &&
                <div>
                    <Formik
                        initialValues={
                            new employeeInitialValue(
                                employee.id,
                                employee.name,
                                employee.surname,
                                employee.address,
                                employee.phoneNumber,
                                employee.nationalId,
                                employee.gender,
                                employee.occupation,
                                employee.startDate,
                                employee.endDate,
                                employee.branch,
                                employee.department,
                                // employee.salaryAmount,
                                // employee.salaryCurreny      
                                //    
                            ).toJSON()}
                        validationSchema={yup.object({
                            name: yup.string().required("Name required!").min(3, "Name is too short!"),
                            surname: yup.string().required("Description required!").min(6, "Description is too short!"),
                            address: yup.string().required("Tax Number Required!").min(5).max(14),
                            phoneNumber: yup.string().required("Description required!").min(6, "Description is too short!"),
                            nationalId: yup.string().required("Description required!").min(6, "Description is too short!"),
                            gender: yup.mixed().oneOf([Gender.FEMALE, Gender.MALE]).required("Gender required!"),
                            occupation: yup.object().shape({
                                id: yup.string().required("Department Responsible needed!")
                            }),
                            branch: yup.object().shape({
                                id: yup.string().required("Department Responsible needed!")
                            }),
                            department: yup.object().shape({
                                id: yup.string().required("Department Responsible needed!")
                            }),
                            startDate: yup.date().required(),
                            endDate: yup.date().required(),
                            salaryAmount: yup.number().required("Salary Amount required!"),
                            salaryCurrency: yup.object().shape({
                                id: yup.string().required()
                            })
                        })}
                        onSubmit={onSubmit}
                    >
                        {formik => (
                            <Form
                                onSubmit={formik.handleSubmit}
                            >
                                <CustomInput name="name" placeholder="Enter Name" label={"Name"} />
                                <CustomInput name="surname" placeholder="Enter Description" type="text" label={"Description"} />
                                <CustomInput name="address" placeholder="Enter Address" type="text" label={"Address"} />
                                <CustomInput name="phoneNumber" placeholder="Enter Phone Number" type="text" label={"Phone Number"} />
                                <CustomInput name="nationalId" placeholder="Enter National Id" type="text" label={"National Id"} />

                                <CustomSelect label="Gender" name="gender">
                                    <option value="">Please select a Gender</option>
                                    <option value={Gender.MALE}>{ToTitleCase(Gender.MALE)}</option>
                                    <option value={Gender.FEMALE}>{ToTitleCase(Gender.FEMALE)}</option>
                                </CustomSelect>

                                <CustomSelect label="Occupation"
                                    name="occupation.id">
                                    <option value="">Please select an Occupation</option>
                                    {
                                        occupationSelectElementList &&
                                        occupationSelectElementList.map((occupationSelectElement: OccupationSelectElement) =>
                                        (
                                            <option value={occupationSelectElement.id}>{occupationSelectElement.occupation}</option>
                                        )
                                        )
                                    }
                                </CustomSelect>

                                <CustomSelect label="Branch"
                                    name="branch.id">
                                    <option value="">Please select a Branch</option>
                                    {
                                        branchSelectElementList &&
                                        branchSelectElementList.map((branchSelectElement: BranchSelectElement) =>
                                        (
                                            <option value={branchSelectElement.id}>{branchSelectElement.name}</option>
                                        )
                                        )
                                    }
                                </CustomSelect>

                                <CustomSelect label="Department"
                                    name="department.id">
                                    <option value="">Please select a Department</option>
                                    {
                                        departmentSelectElementList &&
                                        departmentSelectElementList.map((departmentSelectElement: DepartmentSelectElement) =>
                                        (
                                            <option value={departmentSelectElement.id}>{departmentSelectElement.name}</option>
                                        )
                                        )
                                    }
                                </CustomSelect>

                                <CustomInput name="salaryAmount" type label={"Salary Amount"} placeholder="Please provide a Salary Amount" />

                                <CustomSelect label="salaryCurrency"
                                    name="salaryCurrency.id">
                                    <option value="">Please select a Salary Currency</option>
                                    {
                                        currencySelectElementList &&
                                        currencySelectElementList.map((currencySelectElement: CurrencySelectElement) =>
                                        (
                                            <option value={currencySelectElement.id}>{currencySelectElement.currencyNameAndSymbol}</option>
                                        )
                                        )
                                    }
                                </CustomSelect>


                                <Button type="submit" style={{ marginTop: "1em" }}>
                                    Update Employee
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            }
        </>
    );
}
