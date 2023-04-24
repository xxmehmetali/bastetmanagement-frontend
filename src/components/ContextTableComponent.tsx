import { Accordion } from 'react-bootstrap';
import { Context } from '../models/base/Context';

export default function ContextTableComponent({ context, contextList }: any) {
    contextList = contextList as Context[]
    const contextListRenderElement = []

    if (contextList != undefined) {
        for (let i = 0; i < contextList.length; i++) {
            let cont = contextList[i]
            contextListRenderElement.push(
                <div style={{ border: "2px solid #a8a8a8", marginBottom: "10px", padding: "10px", borderRadius: "10px" }}>
                    <h4>Context {i + 1}</h4>
                    <br />
                    <tr>
                        <td >ID</td>
                        <td>{cont.id}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{cont.name}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{cont.description}</td>
                    </tr>

                    <br />
                    <hr />
                </div>
            );
        }
    }

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Context</Accordion.Header>
                <Accordion.Body className='component-accordion-body'>
                    {context != undefined ?
                        <>
                            <tr>
                                <td >ID</td>
                                <td>{context.id}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>{context.name}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>{context.description}</td>
                            </tr>
                        </>
                        :
                        contextListRenderElement
                    }
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
