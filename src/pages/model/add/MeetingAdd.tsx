
import React from 'react'
import { useAddMeetingMutation } from '../../../features/api/meetingApi';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';
import { Formik } from 'formik';
import { meetingInitialValue } from '../../../yup_schemas/initialValues/meetingInitialValue';
import { Form } from 'react-router-dom';
import CustomInput from '../../../components/customFormElements/CustomInput';
import { Button } from 'react-bootstrap';
import * as yup from "yup";
import CustomSelect from '../../../components/customFormElements/CustomSelect';
import { GetEmployeeSelectElements } from '../../../providers/SelectElementProviders/GetEmployeeSelectElements';
import { EmployeeSelectElement } from '../../../models/frontdtos/EmployeeSelectElement';

export default function MeetingAdd() {
  const [addMeeting, { isLoading }] = useAddMeetingMutation();
  async function onSubmit(values: any, actions: any) {
    console.log(values)
    const result = await addMeeting(values)
    actions.resetForm();
    ResolveResult(result)
  }
  const meetingOwnerSelectElementList: EmployeeSelectElement[] = GetEmployeeSelectElements();
  const meetingPlatformSelectElementList: EmployeeSelectElement[] = GetEmployeeSelectElements();
  
  return (
    <div>
   
    <Formik
      initialValues={meetingInitialValue}
      validationSchema={yup.object({
        meetingUrl: yup.string().required("Meeting Url required!"),
        description: yup.string().required("Description required!").min(3, "Description is too short!"),
        baseUrl: yup.string().required("Name required!").min(3, "Name is too short!"),
        meetingOwner: yup.object().shape({
          id: yup.string().required().matches(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi, "not valid uuid")
        }),
        meetingPlatform: yup.object().shape({
          id: yup.string().required().matches(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi, "not valid uuid")
        })
      })}
      onSubmit={onSubmit}
    >
      {formik => (
        <Form
          onSubmit={formik.handleSubmit}
        >
          <CustomInput name="meetingUrl" placeholder="Enter Meeting Url" type="text" label={"Meeting Url"} />
          <CustomInput name="meetingPlatform" placeholder="Enter Meeting Platform" type="text" label={"meeting Platform"} />

          <CustomSelect label="Meeting Owner"
              name="meetingOwner">
              <option value="">Please select Meeting Owner</option>
              {
                meetingOwnerSelectElementList &&
                meetingOwnerSelectElementList.map((meetingOwnerSelectElement : EmployeeSelectElement) =>
                (
                  <option value={meetingOwnerSelectElement.id}>{meetingOwnerSelectElement.employeeFullName}</option>
                )
                )
              }
            </CustomSelect>
            <CustomSelect label="Meeting Platform"
              name="meetingPlatform">
              <option value="">Please select Meeting Platform</option>
              {
                meetingPlatformSelectElementList &&
                meetingPlatformSelectElementList.map((meetingPlatformSelectElement : EmployeeSelectElement) =>
                (
                  <option value={meetingPlatformSelectElement.id}>{meetingPlatformSelectElement.employeeFullName}</option>
                )
                )
              }
            </CustomSelect>
          <Button type="submit" style={{marginTop:"1em"}}>
            Add Meeting 
          </Button>
        </Form>
      )}
    </Formik>
  </div>
  );
}
    