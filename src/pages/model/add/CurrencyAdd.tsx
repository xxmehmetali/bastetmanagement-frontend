
import React from 'react'
import { useAddCurrencyMutation } from '../../../features/api/currencyApi';
import { Formik } from 'formik';
import { corporationInitialValue } from '../../../yup_schemas/initialValues/corporationInitialValue';
import * as yup from "yup";
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../../components/customFormElements/CustomInput';
import { currencyInitialValue } from '../../../yup_schemas/initialValues/currencyInitialValue';

export default function CurrencyAdd() {
  const [addCurrency, { isLoading }] = useAddCurrencyMutation();
  function onSubmit(values: any, actions: any) {
    console.log(values)
    addCurrency(values)
    actions.resetForm();
  }
  

  return (
    <div>
      <Formik
        initialValues={currencyInitialValue}
        validationSchema={yup.object({
          currencyName: yup.string().required("Currency Name required!").min(2, "Currency Name is too short!").max(20, "Currency Name is too long!"),
          currencySymbol: yup.string().required("Currency Symbol required!").min(1, "Currency Symbol is too short!").max(5, "Currency Symbol is too long!")
        })}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form
            onSubmit={formik.handleSubmit}
          >
            <CustomInput name="currencyName" placeholder="Enter Currency Name" label={"Currency Name"} />
            <CustomInput name="currencySymbol" placeholder="Enter Currency Symbol" type="text" label={"Currency Symbol"} />

            <Button type="submit" style={{marginTop:"1em"}}>
              Add Currency
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
    