import { Formik } from 'formik';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';
import * as yup from "yup";
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../../components/customFormElements/CustomInput';
import { useAddMeetingPlatformMutation, useGetMeetingPlatformByIdQuery } from '../../../features/api/meetingPlatformApi';
import { meetingPlatformInitialValue } from '../../../yup_schemas/initialValues/meetingPlatformInitialValue';
import { useParams } from 'react-router-dom';
import { DataResult } from '../../../results/DataResult';
import { MeetingPlatform } from '../../../models/base/MeetingPlatform';

export default function MeetingPlatformUpdate() {
    let { id } = useParams();

    const { data: meetingPlatformDataResultDataForMeetingPlatform } = useGetMeetingPlatformByIdQuery(id || "");
    const meetingPlatformDataResultForMeetingPlatform: DataResult<MeetingPlatform> = meetingPlatformDataResultDataForMeetingPlatform as DataResult<MeetingPlatform>;
    const meetingPlatform: MeetingPlatform = (meetingPlatformDataResultForMeetingPlatform?.data) as MeetingPlatform;


    const [addMeetingPlatform, { isLoading }] = useAddMeetingPlatformMutation();
    async function onSubmit(values: any, actions: any) {
        console.log(values)
        const result = await addMeetingPlatform(values)
        actions.resetForm();
        ResolveResult(result)
    }

    return (
        <>
            {
                <div>
                    <Formik
                        initialValues={new meetingPlatformInitialValue(
                            meetingPlatform.name,
                            meetingPlatform.description,
                            meetingPlatform.baseUrl
                        ).toJSON()}
                        validationSchema={yup.object({
                            name: yup.string().required("Name required!").min(3, "Name is too short!"),
                            description: yup.string().required("Description required!").min(3, "Description is too short!"),
                            baseUrl: yup.string().required("Name required!").min(3, "Name is too short!"),
                        })}
                        onSubmit={onSubmit}
                    >
                        {formik => (
                            <Form
                                onSubmit={formik.handleSubmit}
                            >
                                <CustomInput name="name" placeholder="Enter Name" type="text" label={"Name"} />
                                <CustomInput name="description" placeholder="Enter Description" type="text" label={"Description"} />
                                <CustomInput name="baseUrl" placeholder="Enter Base Url" type="text" label={"Base Url"} />

                                <Button type="submit" style={{ marginTop: "1em" }}>
                                    Add Meeting Platform
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            }
        </>
    );
}
