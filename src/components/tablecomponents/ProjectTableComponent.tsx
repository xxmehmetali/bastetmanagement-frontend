import { Accordion } from 'react-bootstrap';
import { formatDate } from '../../functions/FormatDateFunction';
import ContextTableComponent from './ContextTableComponent';
import { Project } from '../../models/base/Project';

export default function ProjectTableComponent({ project, projectList, accordionTitle="Project" }: any) {
    projectList = projectList as Project[]
    const projectListRenderElement = []
    if (projectList != undefined) {
        for (let i = 0; i < projectList.length; i++) {
            let proj = projectList[i]
            projectListRenderElement.push(
                <div style={{ border: "2px solid #a8a8a8", marginBottom: "10px",padding: "10px", borderRadius: "10px" }}>
                    <h4>{accordionTitle} {i + 1}</h4>
                    <br />
                    <tr>
                                <td >ID</td>
                                <td>{proj.id}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>{proj.name}</td>
                            </tr>

                            <tr>
                                <td colSpan={2} className="inner-table-component-td">
                                    <ContextTableComponent contextList={proj.contexts} />
                                </td>
                            </tr>

                            <tr>
                                <td>Created At</td>
                                <td>{formatDate(proj.createdAt)}</td>
                            </tr>
                            <tr>
                                <td>Updated At</td>
                                <td>{formatDate(proj.updatedAt)}</td>
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
                <Accordion.Header>{accordionTitle}</Accordion.Header>
                <Accordion.Body className='component-accordion-body'>
                    {project != undefined ?
                        <>
                            <tr>
                                <td >ID</td>
                                <td>{project.id}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>{project.name}</td>
                            </tr>

                            <tr>
                                <td colSpan={2}>
                                    <ContextTableComponent contextList={project.contexts} />
                                </td>
                            </tr>

                            <tr>
                                <td>Created At</td>
                                <td>{formatDate(project.createdAt)}</td>
                            </tr>
                            <tr>
                                <td>Updated At</td>
                                <td>{formatDate(project.updatedAt)}</td>
                            </tr>
                        </>


                        :
                        projectListRenderElement
                    }
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
