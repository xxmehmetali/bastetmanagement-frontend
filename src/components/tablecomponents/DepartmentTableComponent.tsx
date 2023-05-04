import { Accordion } from 'react-bootstrap';

export default function DepartmentTableComponent({ department }: any) {

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Department</Accordion.Header>
                <Accordion.Body className='component-accordion-body'>
                    <tr>
                        <td >ID</td>
                        <td>{department.id}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{department.name}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{department.description}</td>
                    </tr>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
