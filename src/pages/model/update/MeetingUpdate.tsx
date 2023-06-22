import { Formik } from 'formik';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';
import * as yup from "yup";
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../../components/customFormElements/CustomInput';
import CustomSelect from '../../../components/customFormElements/CustomSelect';
import CustomDatePicker from '../../../components/customFormElements/CustomDatePicker';
import { MeetingTypeEnum } from '../../../models/enums/MeetingTypeEnum';
import { MeetingPlatformSelectElement } from '../../../models/frontdtos/MeetingPlatformSelectElement';
import { EmployeeSelectElement } from '../../../models/frontdtos/EmployeeSelectElement';
import { meetingInitialValue } from '../../../yup_schemas/initialValues/meetingInitialValue';
import { GetMeetingPlatformSelectElements } from '../../../providers/SelectElementProviders/GetMeetingPlatformSelectElements';
import { GetEmployeeSelectElements } from '../../../providers/SelectElementProviders/GetEmployeeSelectElements';
import { useAddMeetingMutation, useGetMeetingByIdQuery } from '../../../features/api/meetingApi';
import { useParams } from 'react-router-dom';
import { DataResult } from '../../../results/DataResult';
import { Meeting } from '../../../models/base/Meeting';

export default function MeetingUpdate() {
    let { id } = useParams();

    const { data: meetingDataResultDataForMeeting } = useGetMeetingByIdQuery(id || "");
    const meetingDataResultForMeeting: DataResult<Meeting> = meetingDataResultDataForMeeting as DataResult<Meeting>;
    const meeting: Meeting = (meetingDataResultForMeeting?.data) as Meeting;


    const [addMeeting, { isLoading }] = useAddMeetingMutation();
    async function onSubmit(values: any, actions: any) {
        console.log(values)
        const result = await addMeeting(values)
        actions.resetForm();
        ResolveResult(result)
    }
    const meetingOwnerSelectElementList: EmployeeSelectElement[] = GetEmployeeSelectElements();
    const meetingPlatformSelectElementList: MeetingPlatformSelectElement[] = GetMeetingPlatformSelectElements();

    return (
        <>
            {
                meeting &&
                <div>
                    <Formik
                        initialValues={new meetingInitialValue(
                            meeting.meetingOwner,
                            meeting.meetingPlatform,
                            meeting.meetingUrl,
                            meeting.beginHour,
                            meeting.endHour,
                            meeting.description,
                            meeting.topic,
                            meeting.meetingType
                        ).toJSON()}
                        validationSchema={yup.object({
                            meetingUrl: yup.string().required("Meeting Url required!"),
                            description: yup.string().required("Description required!").min(3, "Description is too short!"),
                            meetingOwner: yup.object().shape({
                                id: yup.string()
                            }),
                            meetingPlatform: yup.object().shape({
                                id: yup.string()
                            }),
                            beginHour: yup.date().required(),
                            endHour: yup.date().required(),
                            topic: yup.string().required(),
                            meetingType: yup.mixed().oneOf(Object.keys(MeetingTypeEnum)).required("Meeting Type required!"),
                        })}
                        onSubmit={onSubmit}
                    >
                        {formik => (
                            <Form
                                onSubmit={formik.handleSubmit}
                            >
                                <CustomInput name="topic" placeholder="Enter Topic" type="text" label={"Topic"} />
                                <CustomInput name="description" placeholder="Enter Description" type="text" label={"Description"} />
                                <CustomInput name="meetingUrl" placeholder="Enter Meeting Url" type="text" label={"Meeting Url"} />

                                <CustomSelect label="Meeting Owner" name="meetingOwner.id">
                                    <option value="">Please select Meeting Owner</option>
                                    {
                                        meetingOwnerSelectElementList &&
                                        meetingOwnerSelectElementList.map((meetingOwnerSelectElement: EmployeeSelectElement) =>
                                        (
                                            <option value={meetingOwnerSelectElement.id}>{meetingOwnerSelectElement.employeeFullName}</option>
                                        )
                                        )
                                    }
                                </CustomSelect>
                                <CustomSelect label="Meeting Platform" name="meetingPlatform.id">
                                    <option value="">Please select Meeting Platform</option>
                                    {
                                        meetingPlatformSelectElementList &&
                                        meetingPlatformSelectElementList.map((meetingPlatformSelectElement: MeetingPlatformSelectElement) =>
                                        (
                                            <option value={meetingPlatformSelectElement.id}>{meetingPlatformSelectElement.name}</option>
                                        )
                                        )
                                    }
                                </CustomSelect>

                                <CustomSelect label="Meeting Type" name="meetingType">
                                    <option value="">Please select a Meeting Type</option>
                                    {
                                        Object.entries(MeetingTypeEnum).map(([key, value]) => (
                                            <option key={key} value={key}>{value}</option>
                                        ))

                                    }
                                </CustomSelect>

                                <CustomDatePicker label="Begin Hour"
                                    name="beginHour" />

                                <CustomDatePicker label="End Hour"
                                    name="endHour" />

                                <Button type="submit" style={{ marginTop: "1em" }}>
                                    Add Meeting
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            }
        </>
    );
}
