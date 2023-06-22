import { Formik } from 'formik';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';
import * as yup from "yup";
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../../components/customFormElements/CustomInput';
import CustomSelect from '../../../components/customFormElements/CustomSelect';
import { useAddBranchMutation, useGetBranchByIdQuery } from '../../../features/api/branchApi';
import { Corporation } from '../../../models/base/Corporation';
import { GetCorporationSelectElements } from '../../../providers/SelectElementProviders/GetCorporationSelectElements';
import { branchInitialValue } from '../../../yup_schemas/initialValues/branchInitialValue';
import { useParams } from 'react-router-dom';
import { DataResult } from '../../../results/DataResult';
import { Branch } from '../../../models/base/Branch';

export default function BranchUpdate() {
    let { id } = useParams();

    const { data: branchDataResultDataForBranch } = useGetBranchByIdQuery(id || "");
    const branchMeetingDataResultForBranch: DataResult<Branch> = branchDataResultDataForBranch as DataResult<Branch>;
    const branch: Branch = (branchMeetingDataResultForBranch?.data) as Branch;


    const [addBranch, { data, isLoading }] = useAddBranchMutation();

    async function onSubmit(values: any, actions: any) {
        const result = await addBranch(values)
        actions.resetForm();
        ResolveResult(result)
    }

    const corporationSelectElementList: Corporation[] = GetCorporationSelectElements();


    return (
        <>
            {
                branch &&
                <div>
                    <Formik
                        initialValues={new branchInitialValue(
                            branch.name,
                            branch.description,
                            branch.phoneNumber,
                            branch.address,
                            branch.corporation
                        ).toJSON()}
                        validationSchema={yup.object({
                            name: yup.string().required("Name required!").min(3, "Name is too short!"),
                            description: yup.string().required("Description required!").min(6, "Description is too short!"),
                            phoneNumber: yup.string().required("Phone Number Required!").min(5).max(14),
                            address: yup.string().required("Address Required!").min(5, "Address is too short!").max(100, "Address is too long!"),
                            corporation: yup.object().shape({
                                id: yup.string().required()
                            })
                        })}
                        onSubmit={onSubmit}
                    >
                        {formik =>
                            <Form
                                onSubmit={formik.handleSubmit}
                            >
                                <CustomInput name="name" placeholder="Enter Name" label={"Name"} />
                                <CustomInput name="description" placeholder="Enter Description" type="text"
                                    label={"Description"} />
                                <CustomInput name="phoneNumber" placeholder="Enter Phone Number" type="text"
                                    label={"Phone Number"} />
                                <CustomInput name="address" placeholder="Enter Address" type="text" label={"Address"} />
                                {/* <CustomInput name="corporation.id" placeholder="Enter Corporation" type="text" label={"Corporation"} /> */}
                                <CustomSelect label="Corporation"
                                    name="corporation.id">
                                    <option value="">Please select a Corporation</option>
                                    {
                                        corporationSelectElementList &&
                                        corporationSelectElementList.map((corporation: Corporation) =>
                                        (
                                            <option value={corporation.id}>{corporation.name}</option>
                                        )
                                        )
                                    }
                                </CustomSelect>

                                <Button type="submit" style={{ marginTop: "1em" }}>
                                    Add Branch
                                </Button>
                            </Form>
                        }
                    </Formik>
                </div>
            }
        </>
    );
}
