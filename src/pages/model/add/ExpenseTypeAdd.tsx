
import { Formik } from 'formik';
import React from 'react'

import CustomInput from '../../../components/customFormElements/CustomInput';
import { Button, Form } from 'react-bootstrap';
import { useAddExpenseTypeMutation } from '../../../features/api/expenseTypeApi';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';
import { expenseTypeInitialValue } from '../../../yup_schemas/initialValues/expenseTypeInitialValue';
import * as yup from "yup";

export default function ExpenseTypeAdd() {
  const [addExpenseType, { isLoading }] = useAddExpenseTypeMutation();
  async function onSubmit(values: any, actions: any) {
    console.log(values)
    const result = await addExpenseType(values)
    actions.resetForm();
    ResolveResult(result)
  }
  return (
    <div>
   <Formik
      initialValues={new expenseTypeInitialValue().toJson()}
      validationSchema={yup.object({
        name: yup.string().required("Name required!").min(1, "Name is too short!"),
        description: yup.string().required("Description required!").min(6, "Description is too short!")
      })}
      onSubmit={onSubmit}
    >
      {formik => (
        <Form
          onSubmit={formik.handleSubmit}
        >
          <CustomInput name="name" placeholder="Enter Name" type="text" label={"Name"} />
          <CustomInput name="description" placeholder="Enter Description" type="text" label={"Description"} />

          <Button type="submit" style={{marginTop:"1em"}}>
            Add Expense Type
          </Button>
        </Form>
      )}
    </Formik>
  </div>
  );
}
    