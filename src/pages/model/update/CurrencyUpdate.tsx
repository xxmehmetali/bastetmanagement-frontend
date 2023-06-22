import { Formik } from 'formik';
import * as yup from "yup";
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../../components/customFormElements/CustomInput';
import { useAddCurrencyMutation, useGetCurrencyByIdQuery } from '../../../features/api/currencyApi';
import { currencyInitialValue } from '../../../yup_schemas/initialValues/currencyInitialValue';
import { useParams } from 'react-router-dom';
import { DataResult } from '../../../results/DataResult';
import { Currency } from '../../../models/base/Currency';

export default function CurrencyUpdate() {
  let { id } = useParams();

  const { data: currencyDataResultDataForCurrency } = useGetCurrencyByIdQuery(id || "");
  const currencyDataResultForCurrency: DataResult<Currency> = currencyDataResultDataForCurrency as DataResult<Currency>;
  const currency: Currency = (currencyDataResultForCurrency?.data) as Currency;

  const [addCurrency, { isLoading }] = useAddCurrencyMutation();
  function onSubmit(values: any, actions: any) {
    console.log(values)
    addCurrency(values)
    actions.resetForm();
  }

  return (
    <>
      {
        currency &&
        <div>
          <Formik
            initialValues={new currencyInitialValue(
              currency.currencyName,
              currency.currencySymbol
            ).toJSON()}
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

                <Button type="submit" style={{ marginTop: "1em" }}>
                  Add Currency
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      }
    </>
  );
}
