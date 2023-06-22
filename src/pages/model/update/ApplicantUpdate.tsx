import { Formik } from 'formik';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';
import * as yup from "yup";
import { Gender } from '../../../models/enums/Gender';
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../../components/customFormElements/CustomInput';
import CustomSelect from '../../../components/customFormElements/CustomSelect';
import { ToTitleCase } from '../../../functions/ToTitleCase';
import { AssesmentStatus } from '../../../models/enums/AssesmentStatus';
import { ApplicantMeetingSelectElement } from '../../../models/frontdtos/ApplicantMeetingSelectElement';
import { CvSelectElement } from '../../../models/frontdtos/CvSelectElement';
import { applicantInitialValue } from '../../../yup_schemas/initialValues/applicantInitialValue';
import { GetCvSelectElements } from '../../../providers/SelectElementProviders/GetCvSelectElements';
import { GetApplicantMeetingSelectElements } from '../../../providers/SelectElementProviders/GetApplicantMeetingSelectElements';
import { useAddApplicantMutation, useGetApplicantByIdQuery } from '../../../features/api/applicantApi';
import { useParams } from 'react-router-dom';
import { Applicant } from '../../../models/base/Applicant';
import { DataResult } from '../../../results/DataResult';

export default function ApplicantUpdate() {

    let { id } = useParams();

    const { data: applicantDataResultDataForApplicant } = useGetApplicantByIdQuery(id || "");
    const applicantDataResultForApplicant: DataResult<Applicant> = applicantDataResultDataForApplicant as DataResult<Applicant>;
    const applicant: Applicant = (applicantDataResultForApplicant?.data) as Applicant;


    const [addApplicant, { data, isLoading }] = useAddApplicantMutation();
    async function onSubmit(values: any, actions: any) {
        console.log(values)
        const result = await addApplicant(values)
        actions.resetForm();
        ResolveResult(result)

    }

    const applicantMeetingSelectElementList: ApplicantMeetingSelectElement[] = GetApplicantMeetingSelectElements();
    const cvSelectElementList: CvSelectElement[] = GetCvSelectElements();

    return (
        <>
            {
                applicant &&
                <div>
                    <Formik
                        initialValues={new applicantInitialValue(
                            applicant.id,
                            applicant.name,
                            applicant.surname,
                            applicant.address,
                            applicant.phoneNumber,
                            applicant.nationalId,
                            applicant.gender,
                            applicant.cv,
                            applicant.hrAssessmentStatus,
                            applicant.technicalAssessmentStatus,
                            applicant.hrReview,
                            applicant.technicalReview,
                            applicant.applicantMeeting
                        ).toJSON()}
                        validationSchema={yup.object({
                            name: yup.string().required("Name required!").min(3, "Name is too short!"),
                            surname: yup.string().required("Surname required!").min(3, "Surname is too short!"),
                            address: yup.string().required("Address required!").min(5, "Address is too short!").max(100, "Address is too long!"),
                            phoneNumber: yup.string().required("Phone Number Required!").min(5).max(14),
                            cv: yup.object().shape({
                                id: yup.string().required()
                            }),
                            applicantMeeting: yup.object().shape({
                                id: yup.string().required()
                            }),
                            nationalId: yup.string().required("National Id required!").min(10).max(11),
                            gender: yup.mixed().oneOf([Gender.FEMALE, Gender.MALE]).required("Gender required!"),
                            hrAssessmentStatus: yup.mixed().oneOf(
                                [AssesmentStatus.HESITANT, AssesmentStatus.NEGATIVE, AssesmentStatus.NOT_ASSESSED, AssesmentStatus.POSITIVE]
                            ).required("HR Assessment Status required!"),
                            technicalAssessmentStatus: yup.mixed().oneOf(
                                [AssesmentStatus.HESITANT, AssesmentStatus.NEGATIVE, AssesmentStatus.NOT_ASSESSED, AssesmentStatus.POSITIVE]
                            ).required("HR Assessment Status required!"),
                            hrReview: yup.string().required("HR Review required!").min(25, "Review is too short!"),
                            technicalReview: yup.string().required("Technical Review required!").min(25, "Review is too short!"),
                        })}
                        onSubmit={onSubmit}
                    >
                        {formik =>
                            <Form
                                onSubmit={formik.handleSubmit}
                            >
                                <CustomInput name="name" placeholder="Enter Name" label={"Name"} />
                                <CustomInput name="surname" placeholder="Enter Surname" type="text" label={"Surname"} />
                                <CustomInput name="address" placeholder="Enter Address" type="text" label={"Address"} />
                                <CustomInput name="phoneNumber" placeholder="Enter Phone Number" type="text" label={"Phone Number"} />
                                <CustomInput name="nationalId" placeholder="Enter National Id" type="text" label={"National Id"} />
                                {/* <CustomInput name="corporation.id" placeholder="Enter Corporation" type="text" label={"Corporation"} /> */}
                                <CustomSelect label="Gender"
                                    name="gender">
                                    <option value="">Please select a Gender</option>
                                    <option value={Gender.MALE}>{ToTitleCase(Gender.MALE)}</option>
                                    <option value={Gender.FEMALE}>{ToTitleCase(Gender.FEMALE)}</option>
                                </CustomSelect>

                                <CustomSelect label="Cv"
                                    name="cv.id">
                                    <option value="">Please select a CV</option>
                                    {
                                        cvSelectElementList &&
                                        cvSelectElementList.map((cvSelectElement: CvSelectElement) =>
                                        (
                                            <option value={cvSelectElement.id}>{cvSelectElement.applicantFullName}</option>
                                        )
                                        )
                                    }
                                </CustomSelect>

                                <CustomSelect label="Hr Assessment Status"
                                    name="hrAssessmentStatus">
                                    <option value="">Please select a HR Assessment Status</option>
                                    <option value={AssesmentStatus.HESITANT}>{ToTitleCase(AssesmentStatus.HESITANT)}</option>
                                    <option value={AssesmentStatus.NOT_ASSESSED}>{ToTitleCase(AssesmentStatus.NOT_ASSESSED)}</option>
                                    <option value={AssesmentStatus.NEGATIVE}>{ToTitleCase(AssesmentStatus.NEGATIVE)}</option>
                                    <option value={AssesmentStatus.POSITIVE}>{ToTitleCase(AssesmentStatus.POSITIVE)}</option>
                                </CustomSelect>

                                <CustomSelect label="Technical Assessment Status"
                                    name="technicalAssessmentStatus">
                                    <option value="">Please select a Technical Assessment Status</option>
                                    <option value={AssesmentStatus.HESITANT}>{ToTitleCase(AssesmentStatus.HESITANT)}</option>
                                    <option value={AssesmentStatus.NOT_ASSESSED}>{ToTitleCase(AssesmentStatus.NOT_ASSESSED)}</option>
                                    <option value={AssesmentStatus.NEGATIVE}>{ToTitleCase(AssesmentStatus.NEGATIVE)}</option>
                                    <option value={AssesmentStatus.POSITIVE}>{ToTitleCase(AssesmentStatus.POSITIVE)}</option>
                                </CustomSelect>

                                <CustomInput name="hrReview" placeholder="Enter HR Review" type="text" label={"HR Review"} />
                                <CustomInput name="technicalReview" placeholder="Enter Technical Review" type="text" label={"Technical Review"} />

                                <CustomSelect label="Applicant Meeting"
                                    name="applicantMeeting.id">
                                    <option value="">Please select an Applicant Meeting</option>
                                    {
                                        applicantMeetingSelectElementList &&
                                        applicantMeetingSelectElementList.map((applicantMeetingSelectElement: ApplicantMeetingSelectElement) =>
                                        (
                                            <option value={applicantMeetingSelectElement.id}>{applicantMeetingSelectElement.applicantFullName}</option>
                                        )
                                        )
                                    }
                                </CustomSelect>

                                <Button type="submit" style={{ marginTop: "1em" }}>
                                    Add Applicant
                                </Button>
                            </Form>
                        }
                    </Formik>
                </div>
            }
        </>
    );
}
