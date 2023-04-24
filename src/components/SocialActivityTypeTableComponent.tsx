import { Accordion } from 'react-bootstrap';
import { formatDate } from '../functions/FormatDateFunction';

export default function SocialActivityTypeTableComponent({ socialActivityType }: any) {
/*,
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
*/
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Social Activity Type</Accordion.Header>
                <Accordion.Body className='component-accordion-body'>
                    <tr>
                        <td >ID</td>
                        <td>{socialActivityType.id}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{socialActivityType.name}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{socialActivityType.description}</td>
                    </tr>
                    <tr>
                        <td>Created At</td>
                        <td>{formatDate(socialActivityType.createdAt)}</td>
                    </tr>
                    <tr>
                        <td>Updated At</td>
                        <td>{formatDate(socialActivityType.updatedAt)}</td>
                    </tr>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}