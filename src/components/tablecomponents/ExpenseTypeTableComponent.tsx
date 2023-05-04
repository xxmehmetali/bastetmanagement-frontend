import { Accordion } from 'react-bootstrap';

export default function ExpenseTypeTableComponent({ expenseType }: any) {

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Expense Type</Accordion.Header>
                <Accordion.Body className='component-accordion-body'>
                    <tr>
                        <td >ID</td>
                        <td>{expenseType.id}</td>
                    </tr>
                    
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
