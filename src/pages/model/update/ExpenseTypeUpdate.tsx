import { Formik } from 'formik';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';
import * as yup from "yup";
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../../components/customFormElements/CustomInput';
import { useAddExpenseTypeMutation, useGetExpenseTypeByIdQuery } from '../../../features/api/expenseTypeApi';
import { expenseTypeInitialValue } from '../../../yup_schemas/initialValues/expenseTypeInitialValue';
import { useParams } from 'react-router-dom';
import { DataResult } from '../../../results/DataResult';
import { ExpenseType } from '../../../models/base/ExpenseType';

export default function ExpenseTypeUpdate() {
    let { id } = useParams();

    const { data: expenseTypeDataResultDataForExpenseType } = useGetExpenseTypeByIdQuery(id || "");
    const expenseTypeDataResultForExpenseType: DataResult<ExpenseType> = expenseTypeDataResultDataForExpenseType as DataResult<ExpenseType>;
    const expenseType: ExpenseType = (expenseTypeDataResultForExpenseType?.data) as ExpenseType;


    const [addExpenseType, { isLoading }] = useAddExpenseTypeMutation();
    async function onSubmit(values: any, actions: any) {
        console.log(values)
        const result = await addExpenseType(values)
        actions.resetForm();
        ResolveResult(result)
    }
    return (
        <>
            {
                expenseType &&
                <div>
                    <Formik
                        initialValues={new expenseTypeInitialValue(
                            expenseType.name,
                            expenseType.description
                        ).toJson()}
                        validationSchema={yup.object({
                            name: yup.string().required("Name required!").min(1, "Name is too short!"),
                            description: yup.string().required("Description required!").min(6, "Description is too short!")
                        })}
                        onSubmit={onSubmit}
                    >
                        {formik => (
                            <Form
                                onSubmit={formik.handleSubmit}
                            >
                                <CustomInput name="name" placeholder="Enter Name" type="text" label={"Name"} />
                                <CustomInput name="description" placeholder="Enter Description" type="text" label={"Description"} />

                                <Button type="submit" style={{ marginTop: "1em" }}>
                                    Add Expense Type
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            }
        </>
    );
}
