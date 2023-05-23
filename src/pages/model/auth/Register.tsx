import { Formik } from 'formik';
import React from 'react'
import { Button, Form } from 'react-bootstrap';
import * as yup from "yup";
import CustomInput from '../../../components/customFormElements/CustomInput';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';
import { registerInitialValue } from '../../../yup_schemas/initialValues/registerInitialValue';
import { NavLink } from 'react-router-dom';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';

export default function Register() {


  // const [addApplicant, { data, isLoading }] = useAddApplicantMutation();
  async function onSubmit(values: any, actions: any) {
    console.log(values)
    // const result = await addApplicant(values)
    actions.resetForm();
    // ResolveResult(result)

  }

  return (
    <div>
      <NavLink to={navigationUrlProvider.auth}>
        <Button variant="primary" className='btn btn-primary me-4 w-25 mt-3 mb-3'>Go Back to Main Screen</Button>
      </NavLink>
      <Formik
        initialValues={registerInitialValue}
        validationSchema={yup.object({

        })}
        onSubmit={onSubmit}
      >
        {formik =>
          <Form
            onSubmit={formik.handleSubmit}
            className='authForm'
          >
            <CustomInput name="username" placeholder="Enter Username" label={"Username"} />
            <CustomInput name="email" placeholder="Enter Email" label={"Email"} />
            <CustomInput name="password" placeholder="Enter Password" type="password" label={"Password"} />
            
            <Button type="submit" style={{ marginTop: "1em" }}>
              Log In
            </Button>
          </Form>
        }
      </Formik>
    </div>
  );
}
    