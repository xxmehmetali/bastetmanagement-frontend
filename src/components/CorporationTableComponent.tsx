import { Accordion } from 'react-bootstrap';
import ProjectTableComponent from './ProjectTableComponent';

export default function CorporationTableComponent({corporation}: any) {
//  console.log(CV)
 return (
    <Accordion>
        <Accordion.Item eventKey="0">
            <Accordion.Header>Corporation</Accordion.Header>
            <Accordion.Body className='component-accordion-body'>
                <tr>

                    <td >ID</td>
                    <td>{corporation.id}</td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>{corporation.name}</td>
                </tr>
                <tr>
                    <td>Description</td>
                    <td>{corporation.description}</td>
                </tr>
                <tr>
                    <td>Tax Number</td>
                    <td>{corporation.taxNumber}</td>
                </tr>
                <tr>
                    <td colSpan={2} className="inner-table-component-td">
                        <ProjectTableComponent projectList={corporation.projects} />
                    </td>
                </tr>
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>
);
}
