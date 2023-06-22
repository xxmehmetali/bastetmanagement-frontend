import { Formik } from 'formik';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';
import * as yup from "yup";
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../../components/customFormElements/CustomInput';
import { socialActivityTypeInitialValue } from '../../../yup_schemas/initialValues/socialActivityTypeInitialValue';
import { useAddSocialActivityTypeMutation, useGetSocialActivityTypeByIdQuery } from '../../../features/api/socialActivityTypeApi';
import { useParams } from 'react-router-dom';
import { DataResult } from '../../../results/DataResult';
import { SocialActivityType } from '../../../models/base/SocialActivityType';

export default function SocialActivityTypeUpdate() {
    let { id } = useParams();

    const { data: socialActivityTypeDataResultDataForSocialActivityType } = useGetSocialActivityTypeByIdQuery(id || "");
    const socialActivityTypeDataResultForSocialActivityType: DataResult<SocialActivityType> = socialActivityTypeDataResultDataForSocialActivityType as DataResult<SocialActivityType>;
    const socialActivityType: SocialActivityType = (socialActivityTypeDataResultForSocialActivityType?.data) as SocialActivityType;

    const [addSocialActivityType, { data, isLoading }] = useAddSocialActivityTypeMutation();
    async function onSubmit(values: any, actions: any) {
        console.log(values)
        const result = await addSocialActivityType(values)
        actions.resetForm();
        ResolveResult(result)

    }

    return (
        <>
            {
                <div>
                    <Formik
                        initialValues={new socialActivityTypeInitialValue(
                            socialActivityType.name,
                            socialActivityType.description
                        ).toJSON()}
                        validationSchema={yup.object({
                            name: yup.string().required("Name required!").min(1, "Name is too short!"),
                            description: yup.string().required("Description required!").min(3, "Description is too short!"),
                            beginHour: yup.date().required("Begin Hour is required!"),
                            endHour: yup.date().required("End Hour is required!"),

                        })}
                        onSubmit={onSubmit}
                    >
                        {(formik) => (
                            <Form
                                onSubmit={formik.handleSubmit}
                            >
                                <CustomInput name="name" placeholder="Enter Name" label={"Name"} />
                                <CustomInput name="description" placeholder="Enter Description" type="text" label={"Description"} />

                                <Button type="submit" style={{ marginTop: "1em" }}>
                                    Add Social Activity Type
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            }
        </>
    );
}
