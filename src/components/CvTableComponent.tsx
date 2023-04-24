import { Accordion } from 'react-bootstrap';

export default function CvTableComponent({cv}: any) {
//  console.log(CV)
 return (
    <Accordion>
        <Accordion.Item eventKey="0">
            <Accordion.Header>Department</Accordion.Header>
            <Accordion.Body className='component-accordion-body'>
                <tr>
                    <td >ID</td>
                    <td>{cv.id}</td>
                </tr>
                <tr>
                    <td>Cv Keywords</td>
                    <td>{cv.cvKeywords}</td>
                </tr>
                <tr>
                 <td>Cv File</td>
                    <td>{cv.cvFile}</td>
                </tr>
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>
);
}
