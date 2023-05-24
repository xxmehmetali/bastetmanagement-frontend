
import React, { useState } from 'react'
import CorporationAddForm from '../../../components/addcomponents/CorporationAddComponent';
import { Formik } from 'formik';
import { corporationInitialValue } from '../../../yup_schemas/initialValues/corporationInitialValue';
import * as yup from "yup";
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../../components/customFormElements/CustomInput';
import { useAddCorporationMutation } from '../../../features/api/corporationApi';

import CustomDatePicker from '../../../components/customFormElements/CustomDatePicker';
import { Calendar } from 'primereact/calendar';

export default function CorporationAdd() {
  const [addCorporation, { isLoading }] = useAddCorporationMutation();
  function onSubmit(values: any, actions: any) {
    addCorporation(values)
    actions.resetForm();
  }

  return (
    <div>
      {/* <CorporationAddForm/> */}
      {/* <Calendar value={dateTime24h} onChange={(e) => setDateTime24h(e.value as Date)} showTime hourFormat="24" /> */}
      <Formik
        initialValues={corporationInitialValue}
        validationSchema={yup.object({
          name: yup.string().required("Name required!").min(3, "Name is too short!"),
          description: yup.string().required("Description required!").min(6, "Description is too short!"),
          taxNumber: yup.string().required("Tax Number Required!").min(5).max(14),
          foundationDate: yup.date().required("No Date is entered!")
        })}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form
            onSubmit={formik.handleSubmit}
          >
            <CustomInput name="name" placeholder="Enter Name" label={"Name"} />
            <CustomInput name="description" placeholder="Enter Description" type="text" label={"Description"} />
            <CustomInput name="taxNumber" placeholder="Enter Tax Number" type="text" label={"Tax Number"} />
            <CustomDatePicker name="foundationDate" label={"Foundation Date"} placeholder="Please provide a Date" />


            <Button type="submit" style={{marginTop:"1em"}}>
              Add Corporation
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
