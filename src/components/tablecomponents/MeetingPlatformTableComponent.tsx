import { Accordion } from 'react-bootstrap';

export default function MeetingPlatformTableComponent({ meetingPlatform }: any) {

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Meeting Platform</Accordion.Header>
                <Accordion.Body className='component-accordion-body'>
                    <tr>
                        <td >ID</td>
                        <td>{meetingPlatform.id}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{meetingPlatform.name}</td>
                    </tr>
                    <tr>
                        <td>Base Url</td>
                        <td>{meetingPlatform.baseUrl}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{meetingPlatform.description}</td>
                    </tr>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
