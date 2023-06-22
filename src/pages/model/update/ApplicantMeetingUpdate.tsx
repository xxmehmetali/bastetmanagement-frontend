import { Formik } from 'formik';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';
import * as yup from "yup";
import { Button, Form } from 'react-bootstrap';
import CustomSelect from '../../../components/customFormElements/CustomSelect';
import { useParams } from 'react-router-dom';
import { DataResult } from '../../../results/DataResult';
import { applicantMeetingInitialValue } from '../../../yup_schemas/initialValues/applicantMeetingInitialValue';
import { EmployeeSelectElement } from '../../../models/frontdtos/EmployeeSelectElement';
import { ApplicantSelectElement } from '../../../models/frontdtos/ApplicantSelectElement';
import { MeetingPlatformSelectElement } from '../../../models/frontdtos/MeetingPlatformSelectElement';
import CustomDatePicker from '../../../components/customFormElements/CustomDatePicker';
import { GetEmployeeSelectElements } from '../../../providers/SelectElementProviders/GetEmployeeSelectElements';
import { GetMeetingPlatformSelectElements } from '../../../providers/SelectElementProviders/GetMeetingPlatformSelectElements';
import { GetApplicantSelectElements } from '../../../providers/SelectElementProviders/GetApplicantSelectElements';
import { useAddApplicantMeetingsMutation, useGetApplicantMeetingByIdQuery } from '../../../features/api/applicantMeetingApi';
import { ApplicantMeeting } from '../../../models/base/ApplicantMeeting';

export default function ApplicantMeetingUpdate() {

    let { id } = useParams();

    const { data: applicantMeetingDataResultDataForApplicantMeeting } = useGetApplicantMeetingByIdQuery(id || "");
    const applicantMeetingDataResultForApplicantMeeting: DataResult<ApplicantMeeting> = applicantMeetingDataResultDataForApplicantMeeting as DataResult<ApplicantMeeting>;
    const applicantMeeting: ApplicantMeeting = (applicantMeetingDataResultForApplicantMeeting?.data) as ApplicantMeeting;

    const [addApplicantMeeting, { data, isLoading }] = useAddApplicantMeetingsMutation();
    async function onSubmit(values: any, actions: any) {
        console.log(values)
        const result = await addApplicantMeeting(values)
        // actions.resetForm();
        ResolveResult(result)

    }

    const meetingOwnerSelectElementList: EmployeeSelectElement[] = GetEmployeeSelectElements();
    const meetingPlatformSelectElementList: MeetingPlatformSelectElement[] = GetMeetingPlatformSelectElements();
    const applicantSelectElementList: ApplicantSelectElement[] = GetApplicantSelectElements();

    return (
        <>
            {
                applicantMeeting &&
                <div>
                    <Formik
                        initialValues={new applicantMeetingInitialValue(
                            applicantMeeting.meetingPlatform,
                            applicantMeeting.beginHour,
                            applicantMeeting.endHour,
                            applicantMeeting.meetingOwner,
                        ).toJSON()}
                        validationSchema={yup.object({
                            beginHour: yup.date().required("Begin Hour is required!"),
                            endHour: yup.date().required("Begin Hour is required!"),
                            meetingOwner: yup.object().shape({
                                id: yup.string().required()
                            }),
                            meetingPlatform: yup.object().shape({
                                id: yup.string().required()
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
            }
        </>
    );
}
