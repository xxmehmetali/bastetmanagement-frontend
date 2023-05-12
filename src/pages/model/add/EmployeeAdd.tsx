
import React from 'react'
import { useAddEmployeeMutation } from '../../../features/api/employeeApi';
import { Formik } from 'formik';
import { employeeInitialValue } from '../../../yup_schemas/initialValues/employeeInitialValue';
import * as yup from "yup";
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../../components/customFormElements/CustomInput';
import CustomDatePicker from '../../../components/customFormElements/CustomDatePicker';
import CustomSelect from '../../../components/customFormElements/CustomSelect';

export default function EmployeeAdd() {
  const [addEmployee, { isLoading }] = useAddEmployeeMutation();
  function onSubmit(values: any, actions: any) {
    console.log(values)
    addEmployee(values)
    actions.resetForm();
  }

  return (
    <div>
      {/* <CorporationAddForm/> */}
      {/* <Calendar value={dateTime24h} onChange={(e) => setDateTime24h(e.value as Date)} showTime hourFormat="24" /> */}
      <Formik
        initialValues={employeeInitialValue}
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
            {/* <CustomInput name="name" placeholder="Enter Name" label={"Name"} />
            <CustomInput name="surname" placeholder="Enter Description" type="text" label={"Description"} />
            <CustomInput name="address" placeholder="Enter Tax Number" type="text" label={"Tax Number"} />
            <CustomInput name="phoneNumber" placeholder="Enter Tax Number" type="text" label={"Tax Number"} />
            <CustomInput name="nationalId" placeholder="Enter Tax Number" type="text" label={"Tax Number"} /> */}
            <CustomSelect name="gender" placeholder="Please Select a Gender" label={"Gender"}>
              <option value="s">22</option>
              <option value="2">asd</option>
            </CustomSelect>
            {/* <CustomInput name="gender" placeholder="Enter Tax Number" type="text" label={"Tax Number"} />
            gender
            
            <CustomInput name="occupation" placeholder="Enter Tax Number" type="text" label={"Tax Number"} />
            occupation

            <CustomDatePicker name="startDate" label={"Foundation Date"} placeholder="Please provide a Date" />
            <CustomDatePicker name="endDate" label={"Foundation Date"} placeholder="Please provide a Date" /> */}


            <Button type="submit" style={{marginTop:"1em"}}>
              Add Corporation
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
    