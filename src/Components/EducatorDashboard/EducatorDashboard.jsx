import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Background from '../../Documents/notloggedinbackground.jpg';
import './EducatorDashboard.css'
import { useStore } from '../../app/store';

const EducatorDashboard = (props) => {
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
            <section className="lists-container">
                <div className="list">
                    <h3 className="list-title"><i className="bi bi-hourglass-bottom" style={{ 'color': '#e69500' }}>&nbsp;&nbsp;</i>Next Three Days</h3>
                    <ul className="list-items">
                        {assignmentsAndStatus.next_three && assignmentsAndStatus.next_three.length > 0 && assignmentsAndStatus.next_three.map((assignment, index) => {
                            let progress = (assignment.students_completed / assignment.assignment_course.number_of_students) * 100;
                            return (
                                <Button key={assignment.id} variant="btn btn-list" onClick={() => handleShow(assignment)}>
                                    <li>
                                        {assignment.assignment_name}
                                        <div className="progress">
                                            <div className="progress-bar bg-success" role="progressbar" style={{ 'width': `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </li>
                                </Button>

                            )
                        })}

                        {assignmentsAndStatus.next_three && assignmentsAndStatus.next_three.length === 0 &&
                            <li key='noAssignments3'>
                                <Button variant="btn btn-list" disabled>
                                    No assignments!
                                </Button>
                            </li>}
                    </ul>
                </div>

                <div className="list">
                    <h3 className="list-title"><i className="bi bi-hourglass-split" style={{ 'color': '#ffcf48' }}>&nbsp;&nbsp;</i>Next Seven Days</h3>
                    <ul className="list-items">
                        {assignmentsAndStatus.next_seven && assignmentsAndStatus.next_seven .length > 0 && assignmentsAndStatus.next_seven .map((assignment, index) => {
                            let progress = (assignment.students_completed / assignment.assignment_course.number_of_students) * 100;
                            return (
                                <Button key={assignment.id} variant="btn btn-list" onClick={() => handleShow(assignment)}>
                                    <li>
                                        {assignment.assignment_name}

                                        <div className="progress">
                                            <div className="progress-bar bg-success" role="progressbar" style={{ 'width': `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </li>
                                </Button>
                            )
                        })}

                        {assignmentsAndStatus.next_seven  && assignmentsAndStatus.next_seven .length === 0 &&
                            <li key='noAssignments7'>
                                <Button variant="btn btn-list" disabled>
                                    No assignments!
                                </Button>
                            </li>}
                    </ul>
                </div>

                <div className="list">
                    <h3 className="list-title"><i className="bi bi-hourglass-top" style={{ 'color': '#ffe394' }}>&nbsp;&nbsp;</i>Later</h3>
                    <ul className="list-items">
                        {assignmentsAndStatus.later && assignmentsAndStatus.later.length > 0 && assignmentsAndStatus.later.map((assignment, index) => {
                            let progress = (assignment.students_completed / assignment.assignment_course.number_of_students) * 100;
                            return (
                                <Button key={assignment.id} variant="btn btn-list" onClick={() => handleShow(assignment)}>
                                    <li>
                                        {assignment.assignment_name}
                                        <div className="progress">
                                            <div className="progress-bar bg-success" role="progressbar" style={{ 'width': `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </li>
                                </Button>
                            )
                        })}

                        {assignmentsAndStatus.later && assignmentsAndStatus.later.length === 0 &&
                            <li key='noAssignmentsLater'>
                                <Button variant="btn btn-list" disabled>
                                    No assignments!
                                </Button>
                            </li>}
                    </ul>
                </div>



                <div className="list">
                    <h3 className="list-title"><i className="bi bi-check-circle" style={{ 'color': 'green' }}>&nbsp;&nbsp;</i>Completed Past 3 Days</h3>
                    <ul className="list-items">
                        {assignmentsAndStatus.completed && assignmentsAndStatus.completed.length > 0 && assignmentsAndStatus.completed.map((assignment, index) => {
                            let progress = (assignment.students_completed / assignment.assignment_course.number_of_students) * 100;
                            return (
                                <Button key={assignment.id} variant="btn btn-list" onClick={() => handleShow(assignment)}>
                                    <li>
                                        {assignment.assignment_name}
                                        <div className="progress">
                                            <div className="progress-bar bg-success" role="progressbar" style={{ 'width': `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </li>
                                </Button>
                            )
                        })}

                        {assignmentsAndStatus.completed  && assignmentsAndStatus.completed.length === 0 &&
                            <li key='noAssignmentsCompleted'>
                                <Button variant="btn btn-list" disabled>
                                    No assignments!
                                </Button>
                            </li>}
                    </ul>
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalContent && <span>{modalContent.assignment_name}</span>} {modalContent && modalContent.assignment_link && <a href={modalContent.assignment_link}  target = "_blank" rel="noreferrer"><i className="bi bi-paperclip"></i></a>}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modalContent &&
                            <div>
                                <li key='desc'><strong>Description:</strong> {modalContent.assignment_desc}</li>
                                <li key='instr'><strong>Instructions:</strong> {modalContent.assignment_instructions}</li>
                                <br></br>
                                <li key='dueDate'><u>Due Date:</u> {modalContent.assignment_due_date}</li>
                                <li key='course'><u>Course:</u> {modalContent.assignment_course.course_name}</li>
                                <br></br>
                                <mark>Status</mark>
                                <li key='studentsEnrolled'><strong>Students Enrolled:</strong> {modalContent.assignment_course.number_of_students}</li>
                                <li key='studentsViewed'><strong>Viewed:</strong> {modalContent.students_viewed}</li>
                                <li key='studentsInProgress'><strong>In Progress:</strong> {modalContent.students_in_progress}</li>
                                <li key='studentsCompleted'><strong>Completed:</strong> {modalContent.students_completed}</li>
                            </div>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <script src="https://cpwebassets.codepen.io/assets/common/stopExecutionOnTimeout-1b93190375e9ccc259df3a57c1abc0e64599724ae30d7ea4c6877eb615f89387.js"></script>
            </section>
        )
    }
    else {
        return (
            <img src={Background} alt="school books with apple" style={{ "height": "80%", "width": "100%", "marginTop": '5%' }}></img>
        )
    }

}

export default EducatorDashboard;