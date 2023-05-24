
import React from 'react'
import * as yup from "yup";
import { useAddContextMutation } from '../../../features/api/contextApi';
import { Formik } from 'formik';
import { contextInitialValue } from '../../../yup_schemas/initialValues/contextInitialValue';
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../../components/customFormElements/CustomInput';

export default function ContextAdd() {
  const [addContext, { isLoading }] = useAddContextMutation();
  function onSubmit(values: any, actions: any) {
    addContext(values)
    actions.resetForm();
  }

  return (
    <div>
    {/* <CorporationAddForm/> */}
    {/* <Calendar value={dateTime24h} onChange={(e) => setDateTime24h(e.value as Date)} showTime hourFormat="24" /> */}
    <Formik
      initialValues={contextInitialValue}
      validationSchema={yup.object({
        name: yup.string().required("Name required!").min(3, "Name is too short!"),
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
            Add Context
          </Button>
        </Form>
      )}
    </Formik>
  </div>
  );
}
    