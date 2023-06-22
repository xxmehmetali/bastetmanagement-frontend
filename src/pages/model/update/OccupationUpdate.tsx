import { Formik } from 'formik';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';
import * as yup from "yup";
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../../components/customFormElements/CustomInput';
import { occupationInitialValue } from '../../../yup_schemas/initialValues/occupationInitialValue';
import { useAddOccupationMutation, useGetOccupationByIdQuery } from '../../../features/api/ocupationApi';
import { useParams } from 'react-router-dom';
import { Occupation } from '../../../models/base/Occupation';
import { DataResult } from '../../../results/DataResult';

export default function OccupationUpdate() {
    let { id } = useParams();

    const { data: occupationDataResultDataForOccupation } = useGetOccupationByIdQuery(id || "");
    const occupationDataResultForOccupation: DataResult<Occupation> = occupationDataResultDataForOccupation as DataResult<Occupation>;
    const occupation: Occupation = (occupationDataResultForOccupation?.data) as Occupation;

    const [addOccupation, { isLoading }] = useAddOccupationMutation();
    async function onSubmit(values: any, actions: any) {
        console.log(values)
        const result = await addOccupation(values)
        actions.resetForm();
        ResolveResult(result)
    }

    return (
        <>
            {
                <div>
                    <Formik
                        initialValues={new occupationInitialValue(
                            occupation.occupation,
                            occupation.detail
                        ).toJSON()}
                        validationSchema={yup.object({
                            occupation: yup.string().required("Name required!").min(1, "occupation is too short!"),
                            detail: yup.string().required("Detail required!").min(2, "detail is too short!"),

                        })}
                        onSubmit={onSubmit}
                    >
                        {formik => (
                            <Form
                                onSubmit={formik.handleSubmit}
                            >
                                <CustomInput name="occupation" placeholder="Enter occupation" type="text" label={"Occupation"} />
                                <CustomInput name="detail" placeholder="Enter Detail" type="text" label={"Detail"} />

                                <Button type="submit" style={{ marginTop: "1em" }}>
                                    Add Occupation
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            }
        </>
    );
}
