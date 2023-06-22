
import { Formik } from 'formik';
import React from 'react'
import * as yup from "yup";
import { useAddDepartmentMutation } from '../../../features/api/departmentApi';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';
import { departmentInitialValue } from '../../../yup_schemas/initialValues/departmentInitialValue';
import CustomSelect from '../../../components/customFormElements/CustomSelect';
import { GetEmployeeSelectElements } from '../../../providers/SelectElementProviders/GetEmployeeSelectElements';
import { EmployeeSelectElement } from '../../../models/frontdtos/EmployeeSelectElement';
import CustomInput from '../../../components/customFormElements/CustomInput';
import { Button, Form } from 'react-bootstrap';

export default function DepartmentAdd() {

  const [addDepartment, { data, isLoading }] = useAddDepartmentMutation();
  async function onSubmit(values: any, actions: any) {
    console.log(values)
    const result = await addDepartment(values)
    actions.resetForm();
    ResolveResult(result)

  }

  const employeeSelectElementList: EmployeeSelectElement[] = GetEmployeeSelectElements();


  return (
    <div>
      <Formik
        initialValues={new departmentInitialValue().toJSON()}
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
  );
}
