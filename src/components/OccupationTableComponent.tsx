import { Accordion } from 'react-bootstrap';

export default function OccupationTableComponent({ occupation }: any) {

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Occupation</Accordion.Header>
                <Accordion.Body className='component-accordion-body'>
                    <tr>
                        <td >ID</td>
                        <td>{occupation.id}</td>
                    </tr>
                    <tr>
                        <td>Occupation</td>
                        <td>{occupation.occupation}</td>
                    </tr>
                    <tr>
                        <td>Detail</td>
                        <td>{occupation.detail}</td>
                    </tr>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>        
    );
}
