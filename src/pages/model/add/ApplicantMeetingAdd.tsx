
import React from 'react'
import { useAddApplicantMeetingsMutation } from '../../../features/api/applicantMeetingApi';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';

import { Formik } from 'formik';
import * as yup from "yup";
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../../components/customFormElements/CustomInput';
import CustomSelect from '../../../components/customFormElements/CustomSelect';
import { EmployeeSelectElement } from '../../../models/frontdtos/EmployeeSelectElement';
import { GetEmployeeSelectElements } from '../../../providers/SelectElementProviders/GetEmployeeSelectElements';
import { MeetingPlatformSelectElement } from '../../../models/frontdtos/MeetingPlatformSelectElement';
import { GetMeetingPlatformSelectElements } from '../../../providers/SelectElementProviders/GetMeetingPlatformSelectElements';
import CustomDatePicker from '../../../components/customFormElements/CustomDatePicker';
import { ApplicantSelectElement } from '../../../models/frontdtos/ApplicantSelectElement';
import { GetApplicantSelectElements } from '../../../providers/SelectElementProviders/GetApplicantSelectElements';
import { applicantMeetingInitialValue } from '../../../yup_schemas/initialValues/applicantMeetingInitialValue';


export default function ApplicantMeetingAdd() {

  const [addApplicantMeeting, { data, isLoading }] = useAddApplicantMeetingsMutation();
  async function onSubmit(values: any, actions: any) {
    console.log(values)
    const result = await addApplicantMeeting(values)
    actions.resetForm();
    ResolveResult(result)

  }
  // applicant meeting dto to applicant meeting 
  // mapper da sıkıntı var backend araştır

  const meetingOwnerSelectElementList: EmployeeSelectElement[] = GetEmployeeSelectElements();
  const meetingPlatformSelectElementList: MeetingPlatformSelectElement[] = GetMeetingPlatformSelectElements();
  const applicantSelectElementList: ApplicantSelectElement[] = GetApplicantSelectElements();

  return (
    <div>
      <Formik
        initialValues={applicantMeetingInitialValue}
        validationSchema={yup.object({
          beginHour: yup.date().required("Begin Hour is required!"),
          endHour: yup.date().required("Begin Hour is required!"),
          meetingOwner: yup.object().shape({
            id: yup.string().required()
          }),
          meetingPlatform: yup.object().shape({
            id: yup.string().required().max(100, "Maximum charachter for platform is reached!")
          }),
          applicant: yup.object().shape({
            id: yup.string().required()
          })
        })}
        onSubmit={onSubmit}
      >
        {formik =>
          <Form
            onSubmit={formik.handleSubmit}
          >
            <CustomSelect label="Meeting Owner"
              name="meetingOwner.id">
              <option value="">Please select a Meeting Owner</option>
              {
                meetingOwnerSelectElementList &&
                meetingOwnerSelectElementList.map((meetingOwnerSelectElement: EmployeeSelectElement) =>
                (
                  <option value={meetingOwnerSelectElement.id}>{meetingOwnerSelectElement.employeeFullName}</option>
                )
                )
              }
            </CustomSelect>

            <CustomSelect label="Meeting Platform"
              name="meetingPlatform.id">
              <option value="">Please select a Meeting Platform</option>
              {
                meetingPlatformSelectElementList &&
                meetingPlatformSelectElementList.map((meetingPlatformSelectElement: MeetingPlatformSelectElement) =>
                (
                  <option value={meetingPlatformSelectElement.id}>{meetingPlatformSelectElement.name}</option>
                )
                )
              }
            </CustomSelect>

            <CustomSelect label="Applicant"
              name="applicant.id">
              <option value="">Please select a Applicant</option>
              {
                applicantSelectElementList &&
                applicantSelectElementList.map((applicantSelectElement: ApplicantSelectElement) =>
                (
                  <option value={applicantSelectElement.id}>{applicantSelectElement.applicantFullName}</option>
                )
                )
              }
            </CustomSelect>

            <CustomDatePicker label="Begin Hour"
              name="beginHour" />

            <CustomDatePicker label="End Hour"
              name="endHour" />

            <Button type="submit" style={{ marginTop: "1em" }}>
              Add Applicant Meeting
            </Button>
          </Form>
        }
      </Formik>
    </div>
  );
}
