import { Formik } from 'formik';
import React from 'react'
import { Button, Form } from 'react-bootstrap';
import * as yup from "yup";
import CustomInput from '../../../components/customFormElements/CustomInput';
import { loginInitialValue } from '../../../yup_schemas/initialValues/loginInitialValue';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';
import { useLoginMutation } from '../../../features/api/authApi';
import { DataResult } from '../../../results/DataResult';
import { JwtResponse } from '../../../models/authDtos/JwtResponse';
import { useDispatch } from 'react-redux';
import { setUser, setIsUserLoggedIn } from '../../../features/slices/userSlice';
import { ToastSuccess } from '../../../functions/toastify/ToastSuccess';
import { ToastError } from '../../../functions/toastify/ToastError';
import { NavLink, useNavigate } from 'react-router-dom';
import navigationUrlProvider from '../../../providers/navigationUrlProvider';

export default function Login() {

  const dispatch = useDispatch();
  const [login, { data, isLoading }] = useLoginMutation();

  const navigate = useNavigate();

  async function onSubmit(values: any, actions: any) {
    try {
      const result: any = await login(values)
      const data = result.data
      if (data.success) {
        dispatch(setIsUserLoggedIn(true))
        dispatch(setUser(data.data))
        ToastSuccess(data.message)
        navigate(navigationUrlProvider.profile)
      } else {
        ToastError(data.message)
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <NavLink to={navigationUrlProvider.auth} >
        <Button variant="primary" className='btn btn-primary me-4 w-25 mt-3 mb-3'>
          Go Back to Main Screen
          </Button>
      </NavLink>
      <Formik
        initialValues={new loginInitialValue().toJSON()}
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
