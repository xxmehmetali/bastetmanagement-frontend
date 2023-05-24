
import React from 'react'
import { ResolveResult } from '../../../functions/toastify/ResolveResult';
import { Formik } from 'formik';
import { Form } from 'react-router-dom';
import CustomInput from '../../../components/customFormElements/CustomInput';
import CustomSelect from '../../../components/customFormElements/CustomSelect';
import { EmployeeSelectElement } from '../../../models/frontdtos/EmployeeSelectElement';
import { useAddExpenseMutation } from '../../../features/api/expenseApi';
import { GetEmployeeSelectElements } from '../../../providers/SelectElementProviders/GetEmployeeSelectElements';
import * as yup from "yup";
import { expenseInitialValue } from '../../../yup_schemas/initialValues/expenseInitialValue';
import { Button } from 'react-bootstrap';
import { ExpenseTypeSelectElement } from '../../../models/frontdtos/ExpenseTypeSelectElement';
import { GetExpenseTypeSelectElements } from '../../../providers/SelectElementProviders/GetExpenseTypeSelectElement';
import CustomDatePicker from '../../../components/customFormElements/CustomDatePicker';

export default function ExpenseAdd() {
  const [addExpense, { isLoading }] = useAddExpenseMutation();
  async function onSubmit(values: any, actions: any) {
    console.log(values)
    const result = await addExpense(values)
    actions.resetForm();
    ResolveResult(result)
  }
  const spendedBySelectElementList: EmployeeSelectElement[] = GetEmployeeSelectElements();
  const expenseTypeSelectElementList: ExpenseTypeSelectElement[] = GetExpenseTypeSelectElements();

  return (
    <div>
   
    <Formik 
      initialValues={expenseInitialValue}
      validationSchema={yup.object({
        meetingUrl: yup.string().required("Meeting Url required!"),
        description: yup.string().required("Description required!").min(3, "Description is too short!"),
        vaucherNo: yup.string().required("Vaucher No required!").min(3, "Name is too short!"),
        expenseAmount: yup.number().required("Expense Amount Required"),
        spendedBy: yup.object().shape({
          id: yup.string().required().matches(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi, "not valid uuid")
        }),
        expenseType: yup.object().shape({
          id: yup.string().required().matches(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi, "not valid uuid")
        }),
        spentDateTime: yup.date().required("No Date is entered!")

      })}
      onSubmit={onSubmit}
    >
      {formik => (
        <Form
          onSubmit={formik.handleSubmit}
        >
          <CustomInput name="name" placeholder="Enter Name" type="text" label={"Name"} />
          <CustomInput name="description" placeholder="Enter Description" type="text" label={"Description"} />
          <CustomInput name="vaucherNo" placeholder="Enter Vaucher No" type="text" label={"Vaucher No"} />
          <CustomInput name="expenseAmount" placeholder="Enter Expense Amount" type="double" label={"Expense Amount"} />

          <CustomSelect label="Spended By"
              name="spendedBy">
              <option value="">Please select the spender</option>
              {
                spendedBySelectElementList &&
                spendedBySelectElementList.map((spendedBySelectElement : EmployeeSelectElement) =>
                (
                  <option value={spendedBySelectElement.id}>{spendedBySelectElement.employeeFullName}</option>
                )
                )
              }
            </CustomSelect>
            <CustomSelect label="Expense Type"
              name="expenseType">
              <option value="">Please select expense type</option>
              {
                expenseTypeSelectElementList &&
                expenseTypeSelectElementList.map((expenseTypeSelectElement : ExpenseTypeSelectElement) =>
                (
                  <option value={expenseTypeSelectElement.id}>{expenseTypeSelectElement.name}</option>
                )
                )
              }
            </CustomSelect>
            <CustomDatePicker name="spentDateTime" label={"spent Date Time"} placeholder="Please provide a Date" />

          <Button type="submit" style={{marginTop:"1em"}}>
            Add Expense
          </Button>
        </Form>
      )}
    </Formik>
  </div>
  );
}
    