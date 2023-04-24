import { Accordion } from 'react-bootstrap';

export default function BranchTableComponent({ branch }: any) {

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header style={{ width: "100% !important", margin: "auto" }}>Branch</Accordion.Header>
                <Accordion.Body className='component-accordion-body' style={{ width: "100% !important", margin: "auto" }}>
                    <tr>
                        <td>ID</td>
                        <td>{branch.id}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{branch.name}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{branch.description}</td>
                    </tr>
                    <tr>
                        <td>Phone Number</td>
                        <td>{branch.phoneNumber}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>{branch.address}</td>
                    </tr>
                    <tr>
                        <td>Corporation</td>
                        <td>{branch.corporation.id}</td>
                    </tr>
                    <tr>
                        <td>Created At</td>
                        <td>{branch.createdAt.toString().slice(0, 10)}</td>
                    </tr>
                    <tr>
                        <td>Updated At</td>
                        <td>{branch.updatedAt.toString().slice(0, 10)}</td>
                    </tr>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
