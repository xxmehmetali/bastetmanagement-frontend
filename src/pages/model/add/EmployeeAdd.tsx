
import React from 'react'
import { useAddEmployeeMutation } from '../../../features/api/employeeApi';
import { Formik } from 'formik';
import { employeeInitialValue } from '../../../yup_schemas/initialValues/employeeInitialValue';
import * as yup from "yup";
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../../components/customFormElements/CustomInput';
import CustomDatePicker from '../../../components/customFormElements/CustomDatePicker';
import CustomSelect from '../../../components/customFormElements/CustomSelect';
import { Occupation } from '../../../models/base/Occupation';
import { GetOccupationSelectElements } from '../../../providers/SelectElementProviders/GetOccupationSelectElements';
import { OccupationSelectElement } from '../../../models/frontdtos/OccupationSelectElement';
import { Gender } from '../../../models/enums/Gender';
import { ToTitleCase } from '../../../functions/ToTitleCase';
import { BranchSelectElement } from '../../../models/frontdtos/BranchSelectElement';
import { DepartmentSelectElement } from '../../../models/frontdtos/DepartmentSelectElement';
import { GetBranchSelectElements } from '../../../providers/SelectElementProviders/GetBranchSelectElements';
import { GetDepartmentSelectElements } from '../../../providers/SelectElementProviders/GetDepartmentSelectElements';
import { CurrencySelectElement } from '../../../models/frontdtos/CurrencySelectElement';
import { GetCurrencySelectElements } from '../../../providers/SelectElementProviders/GetCurrencySelectElements';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';
import { useNavigate } from 'react-router-dom';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';
import { Employee } from '../../../models/base/Employee';

export default function EmployeeAdd() {
  const [addEmployee, { isLoading }] = useAddEmployeeMutation();
  async function onSubmit(values: any, actions: any) {
    console.log(values)
    // const result = await addEmployee(values)
    // actions.resetForm();
    // ResolveResult(result)
  }

  const occupationSelectElementList: OccupationSelectElement[] = GetOccupationSelectElements();
  const branchSelectElementList: BranchSelectElement[] = GetBranchSelectElements();
  const departmentSelectElementList: DepartmentSelectElement[] = GetDepartmentSelectElements();
  const currencySelectElementList: CurrencySelectElement[] = GetCurrencySelectElements();

  return (
    <div>
      <Formik
        // initialValues={employeeInitialValue}
        initialValues={new employeeInitialValue().toJSON()}
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
              Add Corporation
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
