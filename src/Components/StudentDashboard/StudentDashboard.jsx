import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import UpdateAssignmentStatus from '../UpdateAssignmentStatus/UpdateAssignmentStatus';
import Background from '../../Documents/notloggedinbackground.jpg';

const StudentDashboard = (props) => {
    const [assignmentsAndStatus, setAssignmentsAndStatus] = useState();
    const [assignmentsNext3, setAssignmentsNext3] = useState(undefined);
    const [assignmentsNext7, setAssignmentsNext7] = useState(undefined);
    const [assignmentsLater, setAssignmentsLater] = useState(undefined);
    const [assignmentsOverdue, setAssignmentsOverdue] = useState();
    const [assignmentsCompleted, setAssignmentsCompleted] = useState();
    const [archived, setArchived] = useState();
    const [modalContent, setModalContent] = useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    function handleShow(assignment) {
        setShow(true);
        setModalContent(assignment)
    }

    // sort assignments
    useEffect(() => {
        if (assignmentsAndStatus !== undefined && assignmentsAndStatus.length > 0) {
            if (props.userInfo && props.userInfo.is_staff === false) {
                let assignments3 = [];
                let assignments7 = [];
                let assignments = [];
                let overdue = [];
                let completed = [];
                let archived = []

                let today = new Date();
                today.setDate(today.getDate() + 0);

                let threeDays = new Date();
                threeDays.setDate(threeDays.getDate() + 3);

                let threeDaysPast = new Date();
                threeDaysPast.setDate(threeDaysPast.getDate() - 3)

                let sevenDays = new Date();
                sevenDays.setDate(sevenDays.getDate() + 7)

                for (let i = 0; i < assignmentsAndStatus.length; i++) {
                    debugger
                    let assignment_date = new Date(assignmentsAndStatus[i].assignment.assignment_due_date + "T23:59:59");

                    if (assignmentsAndStatus[i].assignment_status === "Completed") {
                        if (assignment_date < today && assignment_date <= threeDaysPast) {
                            archived.push(props.assignments[i])
                        }
                        else {
                            completed.push(assignmentsAndStatus[i])
                        }
                    }

                    else if (assignmentsAndStatus[i].assignment_status !== "Completed") {
                        if (assignment_date <= threeDays && assignment_date >= today) {
                            assignments3.push(assignmentsAndStatus[i])
                        }
                        else if (assignment_date > threeDays && assignment_date <= sevenDays) {
                            assignments7.push(assignmentsAndStatus[i])
                        }
                        else if (assignment_date > sevenDays) {
                            assignments.push(assignmentsAndStatus[i])
                        }
                        else if (assignment_date < today) {
                            overdue.push(assignmentsAndStatus[i])
                        }
                    }
                }

                setAssignmentsNext3(assignments3);
                setAssignmentsNext7(assignments7);
                setAssignmentsLater(assignments);
                setAssignmentsCompleted(completed);
                setAssignmentsOverdue(overdue);
                setArchived(archived)
            }
        }
        // eslint-disable-next-line
    }, [assignmentsAndStatus, props.assignments])

    //compare assignments with assignment statuses
    useEffect(() => {
        if (props.userInfo && props.userInfo.is_staff === false) {
            let assignmentAndStatus = [];
            if (props.assignments !== undefined && props.assignments.length > 0 && props.studentAssignmentStatus !== undefined) {
                for (let i = 0; i < props.assignments.length; i++) {
                    let indexStatus = props.studentAssignmentStatus.findIndex(assignment => assignment.assignment.id === props.assignments[i].id)
                    if (indexStatus > -1) {
                        assignmentAndStatus.push(props.studentAssignmentStatus[indexStatus])
                    }
                    else {
                        assignmentAndStatus.push(
                            {
                                assignment: props.assignments[i],
                                assignment_status: "Not Started",
                                id: 0,
                                student: props.studentInfo
                            }
                        )
                    }

                }
            }
            setAssignmentsAndStatus(assignmentAndStatus)
        }

        // eslint-disable-next-line
    }, [props.assignments, props.studentAssignmentStatus])

    if (props.userInfo) {
        return (
            <div>
                <div className="accordion" id="accordionExample">

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingFour">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseThree">
                                <i className="bi bi-hourglass" style={{ 'color': 'red' }}>&nbsp;&nbsp;</i>Overdue
                            </button>
                        </h2>
                        <div id="collapseFour" className="accordion-collapse collapse show" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
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
                                            {assignmentsOverdue && assignmentsOverdue.length > 0 && assignmentsOverdue.map((assignment, index) => {
                                                return (
                                                    <tr key={assignment.assignment.id}>
                                                        <td>
                                                            <Button variant="btn btn-link assignment-button" onClick={() => handleShow(assignment)}>
                                                                {assignment.assignment.assignment_name}
                                                            </Button>
                                                        </td>
                                                        <td >{assignment.assignment.assignment_course.course_name}</td>
                                                        <td>{assignment.assignment.assignment_due_date}</td>
                                                        {props.userInfo.is_staff === false &&
                                                            <td><UpdateAssignmentStatus assignment={assignment.assignment} currentLabel={assignment.assignment_status} studentInfo={props.studentInfo} getAssignments={props.getAssignments} /></td>
                                                        }

                                                    </tr>
                                                )
                                            }
                                            )}
                                            {assignmentsOverdue && assignmentsOverdue.length === 0 && <td>No assignments!</td>}
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
                        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
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
                                            {assignmentsNext3 && assignmentsNext3.length > 0 && assignmentsNext3.map((assignment, index) => {
                                                return (
                                                    <tr key={assignment.assignment.id}>
                                                        <td>
                                                            <Button variant="btn btn-link assignment-button" onClick={() => handleShow(assignment)}>
                                                                {assignment.assignment.assignment_name}
                                                            </Button>
                                                        </td>
                                                        <td>{assignment.assignment.assignment_course.course_name}</td>
                                                        <td>{assignment.assignment.assignment_due_date}</td>
                                                        {props.userInfo.is_staff === false &&
                                                            <td><UpdateAssignmentStatus assignment={assignment.assignment} currentLabel={assignment.assignment_status} studentInfo={props.studentInfo} getAssignments={props.getAssignments} /></td>
                                                        }
                                                    </tr>
                                                )
                                            }
                                            )}
                                            {assignmentsNext3 && assignmentsNext3.length === 0 && <td>No assignments!</td>}
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
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
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
                                            {assignmentsNext7 && assignmentsNext7.length > 0 && assignmentsNext7.map((assignment, index) => {
                                                return (
                                                    <tr key={assignment.assignment.id}>
                                                        <td>
                                                            <Button variant="btn btn-link assignment-button" onClick={() => handleShow(assignment)}>
                                                                {assignment.assignment.assignment_name}
                                                            </Button>
                                                        </td>

                                                        <td>{assignment.assignment.assignment_course.course_name}</td>
                                                        <td>{assignment.assignment.assignment_due_date}</td>
                                                        {props.userInfo.is_staff === false &&
                                                            <td><UpdateAssignmentStatus assignment={assignment.assignment} currentLabel={assignment.assignment_status} studentInfo={props.studentInfo} getAssignments={props.getAssignments} /></td>
                                                        }

                                                    </tr>
                                                )
                                            }
                                            )}
                                            {assignmentsNext7 && assignmentsNext7.length === 0 && <td>No assignments!</td>}
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
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
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
                                            {assignmentsLater && assignmentsLater.length > 0 && assignmentsLater.map((assignment, index) => {
                                                return (
                                                    <tr key={assignment.assignment.id}>
                                                        <td>
                                                            <Button variant="btn btn-link assignment-button" onClick={() => handleShow(assignment)}>
                                                                {assignment.assignment.assignment_name}
                                                            </Button>
                                                        </td>
                                                        <td>{assignment.assignment.assignment_course.course_name}</td>
                                                        <td>{assignment.assignment.assignment_due_date}</td>
                                                        {props.userInfo.is_staff === false &&
                                                            <td><UpdateAssignmentStatus assignment={assignment.assignment} currentLabel={assignment.assignment_status} studentInfo={props.studentInfo} getAssignments={props.getAssignments} /></td>
                                                        }
                                                    </tr>
                                                )
                                            }
                                            )}
                                            {assignmentsLater && assignmentsLater.length === 0 && <td>No assignments!</td>}
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
                        <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
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
                                            {assignmentsCompleted && assignmentsCompleted.length > 0 && assignmentsCompleted.map((assignment, index) => {
                                                return (
                                                    <tr key={assignment.assignment.id}>
                                                        <td>
                                                            <Button variant="btn btn-link assignment-button" onClick={() => handleShow(assignment)}>
                                                                {assignment.assignment.assignment_name}
                                                            </Button>
                                                        </td>
                                                        <td>{assignment.assignment.assignment_course.course_name}</td>
                                                        <td>{assignment.assignment.assignment_due_date}</td>
                                                        {props.userInfo.is_staff === false &&
                                                            <td><UpdateAssignmentStatus assignment={assignment.assignment} currentLabel={assignment.assignment_status} studentInfo={props.studentInfo} getAssignments={props.getAssignments} /></td>
                                                        }
                                                    </tr>
                                                )
                                            }
                                            )}
                                            {assignmentsCompleted && assignmentsCompleted.length === 0 && <td>No assignments!</td>}
                                        </tbody>
                                    </table>
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalContent && <span>{modalContent.assignment.assignment_name}</span>} {modalContent && modalContent.assignment.assignment_link && <a href={modalContent.assignment.assignment_link}  target = "_blank"><i className="bi bi-paperclip"></i></a>}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modalContent &&
                            <div>
                                <li><strong>Description:</strong> {modalContent.assignment.assignment_desc}</li>
                                <li><strong>Instructions:</strong> {modalContent.assignment.assignment_instructions}</li>
                                <br></br>
                                <li><u>Due Date:</u> {modalContent.assignment.assignment_due_date}</li>
                                <li><u>Course:</u> {modalContent.assignment.assignment_course.course_name}</li>
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