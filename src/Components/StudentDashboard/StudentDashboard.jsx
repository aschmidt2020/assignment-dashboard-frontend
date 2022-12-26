import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import UpdateAssignmentStatus from '../UpdateAssignmentStatus/UpdateAssignmentStatus';
import Background from '../../Documents/notloggedinbackground.jpg';
import { useStore } from '../../app/store';

const StudentDashboard = (props) => {
    const userInfo = useStore((state) => state.userInfo);
    const assignmentsAndStatus = useStore((state) => state.studentAssignmentStatus);
    const [modalContent, setModalContent] = useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    function handleShow(assignment) {
        setShow(true);
        setModalContent(assignment)
    }

    if (userInfo) {
        return (
            <div>
                <div className="accordion" id="accordionExample">

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingFour">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseThree">
                                <i className="bi bi-hourglass" style={{ 'color': 'red' }}>&nbsp;&nbsp;</i>Overdue
                            </button>
                        </h2>
                        <div id="collapseFour" className="accordion-collapse collapse show" aria-labelledby="headingFour">
                            <div className="accordion-body">
                                <span id="view-assignment-later">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Assignment</th>
                                                <th>Course</th>
                                                <th>Due Date</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {assignmentsAndStatus.overdue && assignmentsAndStatus.overdue.length > 0 && assignmentsAndStatus.overdue.map((assignment, index) => {
                                                return (
                                                    <tr key={assignment.id}>
                                                        <td>
                                                            <Button variant="btn btn-link assignment-button" onClick={() => handleShow(assignment)}>
                                                                {assignment.assignment_name}
                                                            </Button>
                                                        </td>
                                                        <td >{assignment.assignment_course.course_name}</td>
                                                        <td>{assignment.assignment_due_date}</td>
                                                        {!userInfo.is_staff &&
                                                            <td><UpdateAssignmentStatus assignment={assignment} currentLabel={assignment.assignment_status || 'Not Started'} /></td>
                                                        }

                                                    </tr>
                                                )
                                            }
                                            )}
                                            {assignmentsAndStatus.overdue && assignmentsAndStatus.overdue.length === 0 && <tr><td>No assignments!</td></tr>}
                                        </tbody>
                                    </table>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                <i className="bi bi-hourglass-bottom" style={{ 'color': '#e69500' }}>&nbsp;&nbsp;</i>Due Next 3 Days
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne">
                            <div className="accordion-body">
                                <span id="view-assignment-3">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Assignment</th>
                                                <th>Course</th>
                                                <th>Due Date</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {assignmentsAndStatus.next_three && assignmentsAndStatus.next_three.length > 0 && assignmentsAndStatus.next_three.map((assignment, index) => {
                                                return (
                                                    <tr key={assignment.id}>
                                                        <td>
                                                            <Button variant="btn btn-link assignment-button" onClick={() => handleShow(assignment)}>
                                                                {assignment.assignment_name}
                                                            </Button>
                                                        </td>
                                                        <td>{assignment.assignment_course.course_name}</td>
                                                        <td>{assignment.assignment_due_date}</td>
                                                        {!userInfo.is_staff &&
                                                            <td><UpdateAssignmentStatus assignment={assignment} currentLabel={assignment.assignment_status || 'Not Started'} /></td>
                                                        }
                                                    </tr>
                                                )
                                            }
                                            )}
                                            {assignmentsAndStatus.next_three && assignmentsAndStatus.next_three.length === 0 && <tr><td>No assignments!</td></tr>}
                                        </tbody>


                                    </table>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                <i className="bi bi-hourglass-split" style={{ 'color': '#ffcf48' }}>&nbsp;&nbsp;</i>Due Next 7 Days
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo">
                            <div className="accordion-body">
                                <span id="view-assignment-7">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Assignment</th>
                                                <th>Course</th>
                                                <th>Due Date</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {assignmentsAndStatus.next_seven && assignmentsAndStatus.next_seven.length > 0 && assignmentsAndStatus.next_seven.map((assignment, index) => {
                                                return (
                                                    <tr key={assignment.id}>
                                                        <td>
                                                            <Button variant="btn btn-link assignment-button" onClick={() => handleShow(assignment)}>
                                                                {assignment.assignment_name}
                                                            </Button>
                                                        </td>

                                                        <td>{assignment.assignment_course.course_name}</td>
                                                        <td>{assignment.assignment_due_date}</td>
                                                        {!userInfo.is_staff &&
                                                            <td><UpdateAssignmentStatus assignment={assignment} currentLabel={assignment.assignment_status || 'Not Started'} /></td>
                                                        }

                                                    </tr>
                                                )
                                            }
                                            )}
                                            {assignmentsAndStatus.next_seven && assignmentsAndStatus.next_seven.length === 0 && <tr><td>No assignments!</td></tr>}
                                        </tbody>
                                    </table>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                <i className="bi bi-hourglass-top" style={{ 'color': '#ffe394' }}>&nbsp;&nbsp;</i>Due Later
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree">
                            <div className="accordion-body">
                                <span id="view-assignment-later">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Assignment</th>
                                                <th>Course</th>
                                                <th>Due Date</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {assignmentsAndStatus.later && assignmentsAndStatus.later.length > 0 && assignmentsAndStatus.later.map((assignment, index) => {
                                                return (
                                                    <tr key={assignment.id}>
                                                        <td>
                                                            <Button variant="btn btn-link assignment-button" onClick={() => handleShow(assignment)}>
                                                                {assignment.assignment_name}
                                                            </Button>
                                                        </td>
                                                        <td>{assignment.assignment_course.course_name}</td>
                                                        <td>{assignment.assignment_due_date}</td>
                                                        {!userInfo.is_staff &&
                                                            <td><UpdateAssignmentStatus assignment={assignment} currentLabel={assignment.assignment_status || 'Not Started'} /></td>
                                                        }
                                                    </tr>
                                                )
                                            }
                                            )}
                                            {assignmentsAndStatus.later && assignmentsAndStatus.later.length === 0 && <tr><td>No assignments!</td></tr>}
                                        </tbody>
                                    </table>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingFive">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseThree">
                                <i className="bi bi-check-circle" style={{ 'color': 'green' }}>&nbsp;&nbsp;</i>Completed
                            </button>
                        </h2>
                        <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive">
                            <div className="accordion-body">
                                <span id="view-assignment-later">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Assignment</th>
                                                <th>Course</th>
                                                <th>Due Date</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {assignmentsAndStatus.completed && assignmentsAndStatus.completed.length > 0 && assignmentsAndStatus.completed.map((assignment, index) => {
                                                return (
                                                    <tr key={assignment.id}>
                                                        <td>
                                                            <Button variant="btn btn-link assignment-button" onClick={() => handleShow(assignment)}>
                                                                {assignment.assignment_name}
                                                            </Button>
                                                        </td>
                                                        <td>{assignment.assignment_course.course_name}</td>
                                                        <td>{assignment.assignment_due_date}</td>
                                                        {!userInfo.is_staff &&
                                                            <td><UpdateAssignmentStatus assignment={assignment} currentLabel={assignment.assignment_status || 'Not Started'} /></td>
                                                        }
                                                    </tr>
                                                )
                                            }
                                            )}
                                            {assignmentsAndStatus.completed && assignmentsAndStatus.completed.length === 0 && <tr><td>No assignments!</td></tr>}
                                        </tbody>
                                    </table>
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalContent && <span>{modalContent.assignment_name}</span>} {modalContent && modalContent.assignment_link && <a href={modalContent.assignment_link}  target = "_blank" rel='noreferrer'><i className="bi bi-paperclip"></i></a>}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modalContent &&
                            <div>
                                <li><strong>Description:</strong> {modalContent.assignment_desc}</li>
                                <li><strong>Instructions:</strong> {modalContent.assignment_instructions}</li>
                                <br></br>
                                <li><u>Due Date:</u> {modalContent.assignment_due_date}</li>
                                <li><u>Course:</u> {modalContent.assignment_course.course_name}</li>
                            </div>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
    else {
        return (
            <img src={Background} alt="school books with apple" style={{ "height": "80%", "width": "100%", "marginTop": '5%' }}></img>
        )
    }
}



export default StudentDashboard;