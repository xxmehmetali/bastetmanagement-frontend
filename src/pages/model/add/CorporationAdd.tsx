
import React from 'react'
import CorporationAddForm from '../../../components/addcomponents/CorporationAddComponent';
import { Formik } from 'formik';
import { corporationInitialValue } from '../../../yup_schemas/initialValues/corporationInitialValue';
import * as yup from "yup";
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../../components/customFormElements/CustomInput';
import { useAddCorporationMutation } from '../../../features/api/corporationApi';

export default function CorporationAdd() {
  
  const [addCorporation, {isLoading}] = useAddCorporationMutation();
  function onSubmit(values: any, actions: any){

      console.log("xxx")
      console.log(values)
  
      addCorporation(values)
    actions.resetForm();
  
    /*
    name: string;
    description: string;
    taxNumber: string;
    foundationDate: Date;
    */
  }

  return (
    <div>
      {/* <CorporationAddForm/> */}

      <Formik
      initialValues={corporationInitialValue}
      validationSchema={yup.object({
        name: yup.string().required("Name required!").min(3, "Name is too short!"),
        description: yup.string().required("Description required!").min(6, "Description is too short!"),
        taxNumber: yup.string().required("Tax Number Required!").min(5).max(14),
        foundationDate : yup.date().required()
      })}
      onSubmit={onSubmit}
    >
      {formik => (
        <Form
          onSubmit={formik.handleSubmit}
        >
         <CustomInput name="name" placeholder="Enter Name" label={"Name"}/>
         <CustomInput name="description" placeholder="Enter Description" type="text" label={"Description"}/>
         <CustomInput name="taxNumber" placeholder="Enter Tax Number" type="text" label={"Tax Number"}/>
         <CustomInput name="foundationDate" placeholder="Enter Foundation Date" type="text" label={"Foundation Date"}/>
         {/* <CustomInput name="projects" placeholder="Enter id" label={"proj"}/> */}

          <Button type="submit">
            Add Corporation
          </Button>
        </Form>
      )}
    </Formik>
    </div>
  );
}
    