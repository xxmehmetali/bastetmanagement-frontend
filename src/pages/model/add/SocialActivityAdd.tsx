
import React from 'react'

import { Formik } from 'formik';
import { applicantInitialValue } from '../../../yup_schemas/initialValues/applicantInitialValue';
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../../components/customFormElements/CustomInput';
import CustomSelect from '../../../components/customFormElements/CustomSelect';
import * as yup from "yup";
import { ResolveResult } from '../../../functions/toastify/ResolveResult';
import { socialActivityInitialValue } from '../../../yup_schemas/initialValues/socialActivityInitialValue';
import { EmployeeSelectElement } from '../../../models/frontdtos/EmployeeSelectElement';
import { GetEmployeeSelectElements } from '../../../providers/SelectElementProviders/GetEmployeeSelectElements';
import { useAddSocialActivityMutation } from '../../../features/api/socialActivityApi';
import { ExpenseSelectElement } from '../../../models/frontdtos/ExpenseSelectElement';
import { GetExpenseSelectElements } from '../../../providers/SelectElementProviders/GetExpenseSelectElements';
import { GetSocialActivityTypeSelectElements } from '../../../providers/SelectElementProviders/GetSocialActivityTypeSelectElements';
import { SocialActivityTypeSelectElement } from '../../../models/frontdtos/SocialActivityTypeSelectElement';

export default function SocialActivityAdd() {
  const [addSocialActivity, { isLoading }] = useAddSocialActivityMutation();
  async function onSubmit(values: any, actions: any) {
    console.log(values)
    const result = await addSocialActivity(values)
    actions.resetForm();
    ResolveResult(result)
  }
  const employeesSelectElementList: EmployeeSelectElement[] = GetEmployeeSelectElements();
  const expensesSelectElementList: ExpenseSelectElement[] = GetExpenseSelectElements();
  const socialActivityTypesSelectElementList: SocialActivityTypeSelectElement[] = GetSocialActivityTypeSelectElements();


  return (
    <div>
   
    <Formik
      initialValues={new socialActivityInitialValue().toJSON()}
      validationSchema={yup.object({
        name: yup.string().required("Name required!").min(3, "Name is too short!"),
        description: yup.string().required("Description required!").min(3, "Description is too short!"),
        place: yup.string().required("place required!").min(3, "place is too short!"),

      })}
      onSubmit={onSubmit}
    >
      {formik => (
        <Form
          onSubmit={formik.handleSubmit}
        >
          <CustomInput name="name" placeholder="Enter Name" type="text" label={"Name"} />
          <CustomInput name="description" placeholder="Enter Description" type="text" label={"Description"} />
          <CustomInput name="place" placeholder="Enter Description" type="text" label={"Description"} />
          BURADA LİSTE ŞEKLİNDE BİRDEN FAZLA EMPLOYEE ALMALI

          <CustomSelect label="Employees"
              name="employees.id">
              <option value="">Please select Employees</option>
              {
                employeesSelectElementList &&
                employeesSelectElementList.map((employeesSelectElement : EmployeeSelectElement) =>
                (
                  <option value={employeesSelectElement.id}>{employeesSelectElement.employeeFullName}</option>
                )
                )
              }
            </CustomSelect>

            
            <CustomSelect label="Expense"
              name="expense">
              <option value="">Please select Expense</option>
              {
                expensesSelectElementList &&
                expensesSelectElementList.map((expensesSelectElement : ExpenseSelectElement) =>
                (
                  <option value={expensesSelectElement.id}>{expensesSelectElement.nameAndDateTime}</option>
                )
                )
              }
            </CustomSelect>
            <CustomSelect label="Social Activity Type"
              name="expense">
              <option value="">Please select Expense</option>
              {
                socialActivityTypesSelectElementList &&
                socialActivityTypesSelectElementList.map((socialActivityTypesSelectElement : SocialActivityTypeSelectElement) =>
                (
                  <option value={socialActivityTypesSelectElement.id}>{socialActivityTypesSelectElement.name}</option>
                )
                )
              }
            </CustomSelect>
          <Button type="submit" style={{marginTop:"1em"}}>
            Add Social Activity
          </Button>
        </Form>
      )}
    </Formik>
  </div>
  );
}
    