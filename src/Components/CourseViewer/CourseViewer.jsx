import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import swal from 'sweetalert';
import { useStore } from '../../app/store';

const CourseViewer = (props) => {
    const { state } = useLocation();
    const userInfo = useStore((state) => state.userInfo);
    const educatorInfo = useStore((state) => state.educatorInfo);
    const [assignments, setAssignments] = useState();
    const [courseInfo, setCourseInfo] = useState();
    const [assignmentName, setAssignmentName] = useState();
    const [assignmentDesc, setAssignmentDesc] = useState();
    const [assignmentDueDate, setAssignmentDueDate] = useState();
    const [assignmentInstr, setAssignmentInstr] = useState();
    const [viewed, setViewed] = useState(0);
    const [inProgress, setInProgress] = useState(0);
    const [completed, setCompleted] = useState(0)
    const [assignmentLink, setAssignmentLink] = useState();
    const [assignmentsNotArchived, setAssignmentsNotArchived] = useState();
    const [show, setShow] = useState(false);

    function handleShow(index) {
        setShow(true);

        setCourseInfo(assignmentsNotArchived[index].assignment_course.id);
        setAssignmentName(assignmentsNotArchived[index].assignment_name);
        setAssignmentDesc(assignmentsNotArchived[index].assignment_desc);
        setAssignmentDueDate(assignmentsNotArchived[index].assignment_due_date);
        setAssignmentInstr(assignmentsNotArchived[index].assignment_instructions);
        setViewed(assignmentsNotArchived[index].students_viewed);
        setInProgress(assignmentsNotArchived[index].students_in_progress);
        setCompleted(assignmentsNotArchived[index].students_completed);
        setAssignmentLink(assignmentsNotArchived[index].upload_to_folder_id);
    }

    function handleClose(index) {
        setShow(false);

        setCourseInfo(assignmentsNotArchived[index].assignment_course.id);
        setAssignmentName(assignmentsNotArchived[index].assignment_name);
        setAssignmentDesc(assignmentsNotArchived[index].assignment_desc);
        setAssignmentDueDate(assignmentsNotArchived[index].assignment_due_date);
        setAssignmentInstr(assignmentsNotArchived[index].assignment_instructions);
        setViewed(assignmentsNotArchived[index].students_viewed);
        setInProgress(assignmentsNotArchived[index].students_in_progress);
        setCompleted(assignmentsNotArchived[index].students_completed);
        setAssignmentLink(assignmentsNotArchived[index].upload_to_folder_id);
    }

    useEffect(() => {
        if(state && state.course){
            getAssignmentsOneCourse(state?.course?.id)
        }
        // eslint-disable-next-line
    }, [state])

    useEffect(() => {
        if (assignments) {
            let assignmentsNotArchived = assignments.filter(assignment =>  assignment.assignment_archived ? false : true)
            setAssignmentsNotArchived(assignmentsNotArchived)
        }
        // eslint-disable-next-line
    }, [assignments])

    async function getAssignmentsOneCourse(course_id) {
        const jwt = localStorage.getItem("token");
        await axios({
            method: "get",
            url: `assignment/getassignments/course/course_id/${course_id}/`,
            headers: {
                Authorization: "Bearer " + jwt
            },
        }).then(response => {
            setAssignments(response.data);
        }).catch(error => {
            alert(error)
        })
    }

    async function deleteAssignment(assignment_id) {
        const jwt = localStorage.getItem("token");
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this assignment!",
            icon: "warning",
            buttons: [
                'Cancel',
                'Yes'
            ],
            dangerMode: true,
        }).then(async function (isConfirm) {
            if (isConfirm) {
                await axios({
                    method: "delete",
                    url: `assignment/educator/deleteassignment/assignment_id/${assignment_id}/`,
                    headers: {
                        Authorization: "Bearer " + jwt
                    },
                }).then(response => {
                    useStore.getState().getAssignments(educatorInfo.id, true);
                    getAssignmentsOneCourse(state?.course?.id);
                }).catch(error => {
                    alert(error)
                })
            }
        })

    }

    async function updateAssignment(assignment_id) {
        const jwt = localStorage.getItem("token");
        await axios({
            method: "put",
            url: `assignment/educator/updateassignment/assignment_id/${assignment_id}/`,
            headers: {
                Authorization: "Bearer " + jwt
            },
            data: {
                assignment_course: courseInfo,
                assignment_name: assignmentName,
                assignment_desc: assignmentDesc,
                assignment_due_date: assignmentDueDate,
                assignment_instructions: assignmentInstr,
                students_completed: completed,
                students_in_progress: inProgress,
                students_viewed: viewed,
                assignment_link: assignmentLink,
            }
        }).then(response => {
            debugger
            useStore.getState().getAssignments(educatorInfo.id, true);
            getAssignmentsOneCourse(state?.course?.id);
            setShow(false);
        }).catch(error => {
            alert(error)
        })
    }

    return (
        <div>
            <table className='table course-table'>
                <thead>
                    <tr>
                        <th>Assignment</th>
                        <th>Due Date</th>
                        <th>Instructions</th>
                        <th># Enrolled</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {assignmentsNotArchived && assignmentsNotArchived.length === 0 && <tr><td>No assignments for this class!</td></tr>}

                    {assignmentsNotArchived && assignmentsNotArchived.length > 0 && assignmentsNotArchived.map((assignment, index) => {
                        return (
                            <tr key={assignment.id}>
                                <td style={{'width':'20%'}}>{assignment.assignment_name} 
                                {assignment.assignment_link && <a href={assignment.assignment_link}  target = "_blank" rel="noreferrer"><i className="bi bi-paperclip"></i></a>}
                                </td>
                                <td style={{'width':'15%'}}>{assignment.assignment_due_date}</td>
                                <td style={{'width':'40%'}}>{assignment.assignment_instructions}</td>
                                <td style={{'textAlign': 'center', 'width':'10%'}}>{assignment.assignment_course.number_of_students}</td>
                                <td style={{ 'textAlign': 'left','width':'15%' }}>
                                    <span>
                                        {userInfo && userInfo.is_staff &&
                                            <span>
                                                <button className='btn btn-outline-dark' onClick={() => deleteAssignment(assignment.id)} data-toggle='popover' title='Delete Assignment' data-content='Delete Assignment' trigger='hover'><i className="bi bi-trash3"></i></button>
                                                <Button variant='btn btn-outline-dark' onClick={() => handleShow(index)} style={{ "marginLeft": "1em" }} data-toggle='popover' title='Edit Assignment' data-content='Edit Assignment' trigger='hover'>
                                                    <i className="bi bi-pencil"></i>
                                                </Button>
                                            </span>}

                                        <span>

                                            <Modal show={show} onHide={() => handleClose(index)}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Update Assignment</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>

                                                    <form onSubmit={() => updateAssignment(assignment.id)}>
                                                        <div className="input-group mb-3">
                                                            <span className="input-group-text">Assignment Name</span>
                                                            <input className="form-control" type="text" name="assignment_name" value={assignmentName} onChange={(event) => setAssignmentName(event.target.value)}></input>
                                                        </div>

                                                        <div className="input-group mb-3">
                                                            <span className="input-group-text">Description</span>
                                                            <input className="form-control" type="text" name="assignment_desc" value={assignmentDesc} onChange={(event) => setAssignmentDesc(event.target.value)}></input>
                                                        </div>

                                                        <div className="input-group mb-3">
                                                            <span className="input-group-text">Due Date</span>
                                                            <input className="form-control" type="date" name="assignment_due_date" value={assignmentDueDate} onChange={(event) => setAssignmentDueDate(event.target.value)}></input>
                                                        </div>

                                                        <div className="input-group mb-3">
                                                            <span className="input-group-text">Assignment Link:</span>
                                                            <input className="form-control" type="text" name="assignment_link" value={assignmentLink} onChange={(event) => setAssignmentLink(event.target.value)}></input>
                                                        </div>

                                                        <div className="form-outline mb-4">
                                                            <label className="form-label">Instructions:</label>
                                                            <textarea className="form-control text-area text-box multi-line w-100" type="text" name="assignment_instructions" value={assignmentInstr} onChange={(event) => setAssignmentInstr(event.target.value)} rows="7"></textarea>
                                                        </div>
                                                    </form>

                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="btn btn-outline-dark" onClick={() => handleClose(index)}>
                                                        Close
                                                    </Button>
                                                    <Button type="submit" variant="btn btn-outline-primary" onClick={() => updateAssignment(assignment.id)}>
                                                        Update
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </span>
                                    </span>
                                </td>
                            </tr>
                        )})}
                </tbody>
            </table>
        </div>
    );
}

export default CourseViewer;
