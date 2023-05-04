import { Accordion } from 'react-bootstrap';
import OccupationTableComponent from './OccupationTableComponent';
import { formatDate } from '../../functions/FormatDateFunction';
import BranchTableComponent from './BranchTableComponent';
import DepartmentTableComponent from './DepartmentTableComponent';
import { Zoom } from 'react-toastify';
import { Employee } from '../../models/base/Employee';

export default function EmployeeTableComponent({ employee, employeeList, accordionTitle = "Employee" }: any) {
    employeeList = employeeList as Employee[]
    const employeeListRenderElement = []
    if (employeeList != undefined) {
        for (let i = 0; i < employeeList.length; i++) {
            let emp = employeeList[i]
            employeeListRenderElement.push(
                <div style={{ border: "2px solid #a8a8a8", marginBottom: "10px", padding: "10px", borderRadius: "10px" }}>
                    <h4>Employee {i + 1}</h4>
                    <br />
                    <tr>
                        <td >ID</td>
                        <td>{emp.id}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{emp.name}</td>
                    </tr>
                    <tr>
                        <td >Surname</td>
                        <td>{emp.surname}</td>
                    </tr>
                    <tr>
                        <td >Address</td>
                        <td>{emp.address}</td>
                    </tr>
                    <tr>
                        <td>Phone Number</td>
                        <td>{emp.phoneNumber}</td>
                    </tr>
                    <tr>
                        <td>National ID</td>
                        <td>{emp.nationalId}</td>
                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td>{emp.gender}</td>
                    </tr>
                    <tr>
                        <td>Occupation</td>
                        <td>{emp.surname}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="inner-table-component-td">
                            <OccupationTableComponent occupation={emp.occupation} />
                        </td>
                    </tr>
                    <tr>
                        <td>Start Date</td>
                        <td>{formatDate(emp.startDate)}</td>
                    </tr>
                    <tr>
                        <td>End Date</td>
                        <td>{formatDate(emp.endDate)}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="inner-table-component-td">
                            <BranchTableComponent branch={emp.branch} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="inner-table-component-td">
                            <DepartmentTableComponent department={emp.department} />
                        </td>
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
                    {employee != undefined ?
                        <>
                            <tr>
                                <td >ID</td>
                                <td>{employee.id}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>{employee.name}</td>
                            </tr>
                            <tr>
                                <td >Surname</td>
                                <td>{employee.surname}</td>
                            </tr>
                            <tr>
                                <td >Address</td>
                                <td>{employee.address}</td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td>{employee.phoneNumber}</td>
                            </tr>
                            <tr>
                                <td>National ID</td>
                                <td>{employee.nationalId}</td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>{employee.gender}</td>
                            </tr>
                            <tr>
                                <td>Occupation</td>
                                <td>{employee.surname}</td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="inner-table-component-td">
                                    <OccupationTableComponent occupation={employee.occupation} />
                                </td>
                            </tr>
                            <tr>
                                <td>Start Date</td>
                                <td>{formatDate(employee.startDate)}</td>
                            </tr>
                            <tr>
                                <td>End Date</td>
                                <td>{formatDate(employee.endDate)}</td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="inner-table-component-td">
                                    <BranchTableComponent branch={employee.branch} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="inner-table-component-td">
                                    <DepartmentTableComponent department={employee.department} />
                                </td>
                            </tr>
                        </>

                        :
                        employeeListRenderElement

                    }

                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
