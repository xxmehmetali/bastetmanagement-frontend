
import React from 'react'
import { useAddSocialActivityTypeMutation } from '../../../features/api/socialActivityTypeApi';

import { ResolveResult } from '../../../functions/toastify/ResolveResult';
import { Formik } from 'formik';
import { Form } from 'react-router-dom';
import CustomSelect from '../../../components/customFormElements/CustomSelect';
import { Button } from 'react-bootstrap';
import CustomInput from '../../../components/customFormElements/CustomInput';
import { socialActivityTypeInitialValue } from '../../../yup_schemas/initialValues/socialActivityTypeInitialValue';
import * as yup from 'yup';

export default function SocialActivityTypeAdd() {
  const [addSocialActivityType, { data, isLoading }] = useAddSocialActivityTypeMutation();
  async function onSubmit(values: any, actions: any) {
    console.log(values)
    const result = await addSocialActivityType(values)
    actions.resetForm();
    ResolveResult(result)

  }

  return (
    <div>
      <Formik
        initialValues={socialActivityTypeInitialValue}
        validationSchema={yup.object({
          name: yup.string().required("Name required!").min(1, "Name is too short!"),
          description: yup.string().required("Description required!").min(3, "Description is too short!"),
          beginHour: yup.date().required("Begin Hour is required!"),
          endHour: yup.date().required("End Hour is required!"),
       
        })}
        onSubmit={onSubmit}
      >
        {(formik )=> (
          <Form
            onSubmit={formik.handleSubmit}
          >
            <CustomInput name="name" placeholder="Enter Name" label={"Name"} />
            <CustomInput name="description" placeholder="Enter Description" type="text" label={"Description"} />

            <Button type="submit" style={{ marginTop: "1em" }}>
              Add Social Activity Type
            </Button>
          </Form>
        )} 
      </Formik>
    </div>
  );
}
    