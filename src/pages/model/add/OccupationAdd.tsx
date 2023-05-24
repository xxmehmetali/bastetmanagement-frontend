
import { Formik } from 'formik';
import React from 'react'
import { Form } from 'react-router-dom';
import CustomInput from '../../../components/customFormElements/CustomInput';
import CustomSelect from '../../../components/customFormElements/CustomSelect';
import { Button } from 'react-bootstrap';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';
import { useAddOccupationMutation } from '../../../features/api/ocupationApi';
import * as yup from "yup";
import { occupationInitialValue } from '../../../yup_schemas/initialValues/occupationInitialValue';


export default function OccupationAdd() {
  const [addOccupation, { isLoading }] = useAddOccupationMutation();
  async function onSubmit(values: any, actions: any) {
    console.log(values)
    const result = await addOccupation(values)
    actions.resetForm();
    ResolveResult(result)
  }
 
  return (
    <div>
   
    <Formik
      initialValues={occupationInitialValue}
      validationSchema={yup.object({
        occupation: yup.string().required("Name required!").min(1, "occupation is too short!"),
        detail: yup.string().required("Detail required!").min(2, "detail is too short!"),

      })}
      onSubmit={onSubmit}
    >
      {formik => (
        <Form
          onSubmit={formik.handleSubmit}
        >
          <CustomInput name="occupation" placeholder="Enter occupation" type="text" label={"Occupation"} />
          <CustomInput name="detail" placeholder="Enter Detail" type="text" label={"Detail"} />
          
          <Button type="submit" style={{marginTop:"1em"}}>
            Add Occupation
          </Button>
        </Form>
      )}
    </Formik>
  </div>
  );
}
    