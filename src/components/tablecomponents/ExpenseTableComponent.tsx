import { Accordion } from 'react-bootstrap';
import EmployeeTableComponent from './EmployeeTableComponent';
import { EmployeeStatus } from '../../models/enums/EmployeeStatus';
import { formatDate } from '../../functions/FormatDateFunction';

export default function ExpenseTableComponent({ expense }: any) {

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Expense</Accordion.Header>
                <Accordion.Body className='component-accordion-body'>
                    <tr>
                        <td >ID</td>
                        <td>{expense.id}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{expense.name}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{expense.description}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="inner-table-component-td">
                            <EmployeeTableComponent employee={expense.spendedBy} accordionTitle={EmployeeStatus.SPENDED_BY}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Vaucher No</td>
                        <td>{expense.voucherNo}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            {/* expensetype */}
                        </td>
                    </tr>
                    <tr>
                        <td>Spent Date</td>
                        <td>{formatDate(expense.spentDateTime)}</td>
                    </tr>
                    {/*     private UUID id;

    private String name;

    private String description;

    private EmployeeDto spendedBy;

    private Double voucherNo;

    private ExpenseTypeDto expenseType;

    private String spentDateTime; */}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
