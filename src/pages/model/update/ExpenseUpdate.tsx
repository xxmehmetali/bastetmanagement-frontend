import { Formik } from 'formik';
import { GetCurrencySelectElements } from '../../../providers/SelectElementProviders/GetCurrencySelectElements';
import { CurrencySelectElement } from '../../../models/frontdtos/CurrencySelectElement';
import { ResolveResult } from '../../../functions/toastify/ResolveResult';
import * as yup from "yup";
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../../components/customFormElements/CustomInput';
import CustomSelect from '../../../components/customFormElements/CustomSelect';
import { useAddExpenseMutation, useGetExpenseByIdQuery } from '../../../features/api/expenseApi';
import { EmployeeSelectElement } from '../../../models/frontdtos/EmployeeSelectElement';
import { GetEmployeeSelectElements } from '../../../providers/SelectElementProviders/GetEmployeeSelectElements';
import { ExpenseTypeSelectElement } from '../../../models/frontdtos/ExpenseTypeSelectElement';
import { GetExpenseTypeSelectElements } from '../../../providers/SelectElementProviders/GetExpenseTypeSelectElement';
import { SocialActivitySelectElement } from '../../../models/frontdtos/SocialActivitySelectElement';
import { GetSocialActivitySelectElements } from '../../../providers/SelectElementProviders/GetSocialActivitySelectElement';
import { expenseInitialValue } from '../../../yup_schemas/initialValues/expenseInitialValue';
import CustomDatePicker from '../../../components/customFormElements/CustomDatePicker';
import { useParams } from 'react-router-dom';
import { Expense } from '../../../models/base/Expense';
import { DataResult } from '../../../results/DataResult';

export default function ExpenseUpdate() {
    let { id } = useParams();

    const { data: expenseDataResultDataForExpense } = useGetExpenseByIdQuery(id || "");
    const expenseDataResultForExpense: DataResult<Expense> = expenseDataResultDataForExpense as DataResult<Expense>;
    const expense: Expense = (expenseDataResultForExpense?.data) as Expense;


    const [addExpense, { isLoading }] = useAddExpenseMutation();
    async function onSubmit(values: any, actions: any) {
        console.log(values)
        const result = await addExpense(values)
        actions.resetForm();
        ResolveResult(result)
    }
    const spendedBySelectElementList: EmployeeSelectElement[] = GetEmployeeSelectElements();
    const expenseTypeSelectElementList: ExpenseTypeSelectElement[] = GetExpenseTypeSelectElements();
    const currencySelectElementList: CurrencySelectElement[] = GetCurrencySelectElements();
    const socialActivitySelectElementList: SocialActivitySelectElement[] = GetSocialActivitySelectElements();

    return (
        <>
            {
                expense &&
                <div>
                    <Formik
                        initialValues={new expenseInitialValue(
                            expense.name,
                            expense.description,
                            expense.spendedBy,
                            expense.voucherNo,
                            expense.expenseType,
                            expense.expenseAmount,
                            expense.spentDateTime,
                            expense.expenseCurrencyType,
                            expense.socialActivity
                        ).toJSON()}
                        validationSchema={yup.object({
                            name: yup.string().required("Name required!"),
                            description: yup.string().required("Description required!").min(3, "Description is too short!"),
                            spendedBy: yup.object().shape({
                                id: yup.string().required()
                            }),
                            voucherNo: yup.string().required("Voucher No required!").min(3, "Name is too short!"),
                            expenseAmount: yup.number().required("Expense Amount Required"),
                            expenseType: yup.object().shape({
                                id: yup.string().required()
                            }),
                            spentDateTime: yup.date().required("No Date is entered!"),
                            expenseCurrencyType: yup.object().shape({
                                id: yup.string().required()
                            })

                        })}
                        onSubmit={onSubmit}
                    >
                        {formik => (
                            <Form
                                onSubmit={formik.handleSubmit}
                            >
                                <CustomInput name="name" placeholder="Enter Name" type="text" label={"Name"} />
                                <CustomInput name="description" placeholder="Enter Description" type="text" label={"Description"} />
                                <CustomInput name="voucherNo" placeholder="Enter Voucher No" type="text" label={"Voucher No"} />
                                <CustomInput name="expenseAmount" placeholder="Enter Expense Amount" type="double" label={"Expense Amount"} />

                                <CustomSelect label="Spended By" name="spendedBy.id">
                                    <option value="">Please select the spender</option>
                                    {
                                        spendedBySelectElementList &&
                                        spendedBySelectElementList.map((spendedBySelectElement: EmployeeSelectElement) =>
                                        (
                                            <option value={spendedBySelectElement.id}>{spendedBySelectElement.employeeFullName}</option>
                                        )
                                        )
                                    }
                                </CustomSelect>
                                <CustomSelect label="Expense Type" name="expenseType.id">
                                    <option value="">Please select expense type</option>
                                    {
                                        expenseTypeSelectElementList &&
                                        expenseTypeSelectElementList.map((expenseTypeSelectElement: ExpenseTypeSelectElement) =>
                                        (
                                            <option value={expenseTypeSelectElement.id}>{expenseTypeSelectElement.name}</option>
                                        )
                                        )
                                    }
                                </CustomSelect>
                                <CustomSelect label="Currency" name="expenseCurrencyType.id">
                                    <option value="">Please select Currency</option>
                                    {
                                        currencySelectElementList &&
                                        currencySelectElementList.map((currencySelectElement: CurrencySelectElement) =>
                                        (
                                            <option value={currencySelectElement.id}>{currencySelectElement.currencyNameAndSymbol}</option>
                                        )
                                        )
                                    }
                                </CustomSelect>
                                <CustomSelect label="Social Activity (OPTIONAL)" name="socialActivity.id">
                                    <option value="">Please select a Social Activity</option>
                                    {
                                        socialActivitySelectElementList &&
                                        socialActivitySelectElementList.map((socialActivitySelectElementList: SocialActivitySelectElement) =>
                                        (
                                            <option value={socialActivitySelectElementList.id}>{socialActivitySelectElementList.name}</option>
                                        )
                                        )
                                    }
                                </CustomSelect>

                                <CustomDatePicker name="spentDateTime" label={"spent Date Time"} placeholder="Please provide a Date" />

                                <Button type="submit" style={{ marginTop: "1em" }}>
                                    Add Expense
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            }
        </>
    );
}
