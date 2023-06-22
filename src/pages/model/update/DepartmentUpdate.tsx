import React from 'react'
import { Formik } from 'formik';
import { OccupationSelectElement } from '../../../models/frontdtos/OccupationSelectElement';
import { GetOccupationSelectElements } from '../../../providers/SelectElementProviders/GetOccupationSelectElements';
import { GetBranchSelectElements } from '../../../providers/SelectElementProviders/GetBranchSelectElements';
import { GetDepartmentSelectElements } from '../../../providers/SelectElementProviders/GetDepartmentSelectElements';
import { GetCurrencySelectElements } from '../../../providers/SelectElementProviders/GetCurrencySelectElements';
import { BranchSelectElement } from '../../../models/frontdtos/BranchSelectElement';
import { DepartmentSelectElement } from '../../../models/frontdtos/DepartmentSelectElement';
import { CurrencySelectElement } from '../../../models/frontdtos/CurrencySelectElement';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';
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
import { useAddDepartmentMutation, useGetDepartmentByIdQuery } from '../../../features/api/departmentApi';
import { EmployeeSelectElement } from '../../../models/frontdtos/EmployeeSelectElement';
import { GetEmployeeSelectElements } from '../../../providers/SelectElementProviders/GetEmployeeSelectElements';
import { departmentInitialValue } from '../../../yup_schemas/initialValues/departmentInitialValue';
import { Department } from '../../../models/base/Department';

export default function DepartmentUpdate() {
    let { id } = useParams();

    const { data: departmentDataResultDataForDepartment } = useGetDepartmentByIdQuery(id || "");
    const departmentDataResultForDepartment: DataResult<Department> = departmentDataResultDataForDepartment as DataResult<Department>;
    const department: Department = (departmentDataResultForDepartment?.data) as Department;

    const [addDepartment, { data, isLoading }] = useAddDepartmentMutation();
    async function onSubmit(values: any, actions: any) {
        console.log(values)
        const result = await addDepartment(values)
        actions.resetForm();
        ResolveResult(result)

    }

    const employeeSelectElementList: EmployeeSelectElement[] = GetEmployeeSelectElements();


    return (
        <>
            {
                department &&
                <div>
                    <Formik
                        initialValues={new departmentInitialValue(
                            department.name,
                            department.description,
                            department.departmentResponsible
                        ).toJSON()}
                        validationSchema={yup.object({
                            departmentResponsible: yup.object().shape({
                                id: yup.string().required("Department Responsible needed!")
                            }),
                            description: yup.string().required().min(15, "Description is too short!"),
                            name: yup.string().required().min(3, "Name is too short!"),
                        })}
                        onSubmit={onSubmit}
                    >
                        {formik =>
                            <Form
                                onSubmit={formik.handleSubmit}
                            >

                                <CustomInput name="name" placeholder="Enter Name" type="text" label={"Name"} />

                                <CustomInput name="description" placeholder="Enter Description" type="text" label={"Description"} />

                                <CustomSelect label="Department Responsible"
                                    name="departmentResponsible.id">
                                    <option value="">Please select a Department Responsible</option>
                                    {
                                        employeeSelectElementList &&
                                        employeeSelectElementList.map((employeeSelectElement: EmployeeSelectElement) =>
                                        (
                                            <option value={employeeSelectElement.id}>{employeeSelectElement.employeeFullName}</option>
                                        )
                                        )
                                    }
                                </CustomSelect>

                                <Button type="submit" style={{ marginTop: "1em" }}>
                                    Add Department
                                </Button>
                            </Form>
                        }
                    </Formik>
                </div>
            }
        </>
    );
}
