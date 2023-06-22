import React from "react";
import { Formik } from "formik";
import { applicantInitialValue } from "../../../yup_schemas/initialValues/applicantInitialValue";
import { Button, Form } from "react-bootstrap";
import CustomInput from "../../../components/customFormElements/CustomInput";
import CustomSelect from "../../../components/customFormElements/CustomSelect";
import * as yup from "yup";
import { ResolveResult } from "../../../functions/toastify/ResolveResult";
import { Corporation } from "../../../models/base/Corporation";
import { GetCorporationSelectElements } from "../../../providers/SelectElementProviders/GetCorporationSelectElements";
import { useAddProjectMutation } from "../../../features/api/projectApi";
import { projectInitialValue } from "../../../yup_schemas/initialValues/projectInitialValue";
import { EmployeeSelectElement } from "../../../models/frontdtos/EmployeeSelectElement";
import { GetEmployeeSelectElements } from "../../../providers/SelectElementProviders/GetEmployeeSelectElements";
import { CorporationSelectElement } from "../../../models/frontdtos/CorporationSelectElement";

export default function ProjectAdd() {
  const [addProject, { data, isLoading }] = useAddProjectMutation();
  async function onSubmit(values: any, actions: any) {
    console.log("add");
    const result = await addProject(values);
    actions.resetForm();
    ResolveResult(result);
  }

  const corporationSelectElementList: CorporationSelectElement[] =
    GetCorporationSelectElements();
  const employeesSelectElementList: EmployeeSelectElement[] =
    GetEmployeeSelectElements();

  return (
    <div>
     <Formik
        initialValues={new projectInitialValue().toJSON()}
        validationSchema={yup.object({
          name: yup
            .string()
            .required("Name required!")
           ,
          corporation: yup.object().shape({
            id: yup
              .string()
              .required(),
          }),
          employee: yup.object().shape({
            id: yup.string().required()         
          })
        })}
        onSubmit={onSubmit}
      >
        {formik => 
          <Form onSubmit={formik.handleSubmit}>
            <CustomInput name="name" placeholder="Enter Name" label={"Name"} />
            <CustomSelect label="Corporation" name="corporation.id">
              <option value="">Please select a Corporation</option>
              {corporationSelectElementList &&
                corporationSelectElementList.map((corporation: CorporationSelectElement) => (
                  <option value={corporation.id}>{corporation.name}</option>
                ))}
            </CustomSelect>

            <CustomSelect label="Employees" name="employee.id">
              <option value="">Please select Employees</option>
              {employeesSelectElementList &&
                employeesSelectElementList.map(
                  (employeesSelectElement: EmployeeSelectElement) => (
                    <option value={employeesSelectElement.id}>
                      {employeesSelectElement.employeeFullName}
                    </option>
                  )
                )}
            </CustomSelect>
            <Button type="submit" style={{ marginTop: "1em" }}>
              Add Branch
            </Button>
          </Form>
        }
      </Formik>
    </div>
  );
}
