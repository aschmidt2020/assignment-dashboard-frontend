import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useForm from "../CustomHooks/useForm";

const CourseViewer = (props) => {
    const {state} = useLocation();
    const { id, course, educator } = state;
    const [assignments, setAssignments] = useState();

    const [assignmentName, setAssignmentName] = useState();
    const [assignmentDesc, setAssignmentDesc] = useState();
    const [assignmentDueDate, setAssignmentDueDate] = useState();
    const [assignmentInstr, setAssignmentInstr] = useState();

    const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    function handleShow(index){
        setShow(true);
        setAssignmentName(assignments[index].assignment.assignment_name);
        setAssignmentDesc(assignments[index].assignment.assignment_desc);
        setAssignmentDueDate(assignments[index].assignment.assignment_due_date);
        setAssignmentInstr(assignments[index].assignment.assignment_instructions);
    }

    function handleClose(index) {
        setShow(false);
        setAssignmentName(assignments[index].assignment.assignment_name);
        setAssignmentDesc(assignments[index].assignment.assignment_desc);
        setAssignmentDueDate(assignments[index].assignment.assignment_due_date);
        setAssignmentInstr(assignments[index].assignment.assignment_instructions);
    }

    useEffect(() => {
        getAssignmentsOneCourse(course.id)
        // eslint-disable-next-line
      }, [state])

    async function getAssignmentsOneCourse(course_id){
        const jwt = localStorage.getItem("token");
        await axios({
            method: "get",
            url: `http://127.0.0.1:8000/api/assignment/getassignments/course/${course_id}/`,
            headers: {
            Authorization: "Bearer " + jwt
            },
        }).then(response => {
            setAssignments(response.data);
        }).catch(error => {
            alert(error)
        })
    }

    async function deleteAssignment(assignment_id){
        const jwt = localStorage.getItem("token");
        await axios({
            method: "delete",
            url: `http://127.0.0.1:8000/api/assignment/educator/deleteassignment/${assignment_id}/`,
            headers: {
            Authorization: "Bearer " + jwt
            },
        }).then(response => {
            props.getAssignments()
        }).catch(error => {
            alert(error)
        })
    }

    async function updateAssignment(assignment_id){
        const jwt = localStorage.getItem("token");
        await axios({
            method: "put",
            url: `http://127.0.0.1:8000/api/assignment/educator/updateassignment/${assignment_id}/`,
            headers: {
            Authorization: "Bearer " + jwt
            },
            data: {
                assignment_name: assignmentName,
                assignment_desc: assignmentDesc,
                assignment_due_date: assignmentDueDate,
                assignment_instructions: assignmentInstr,
                assignment_archived: "False"
            }
        }).then(response => {
            props.getAssignments()
        }).catch(error => {
            alert(error)
        })
    }

    return (
        <div>
            {assignments && assignments.length ===0 &&  <p>No assignments for this class!</p>}

            {assignments && assignments.length > 0 &&assignments.map((assignment, index) => {
                return(
                    <div key={assignment.assignment.id}>
                     <p>{assignment.assignment.assignment_name}</p>
                    {props.userInfo.is_staff ===true && <button onClick={() => deleteAssignment(assignment.assignment.id)}>Delete Assignment</button>}
                    {props.userInfo.is_staff ===true && 
                    <span id="add-assignment">
                        <Button variant="btn btn-outline-primary" onClick={() => handleShow(index)} style={{ "marginLeft": "6em" }}>
                            Update Assignment
                        </Button>

                        <Modal show={show} onHide={()=> handleClose(index)}>
                            <Modal.Header closeButton>
                            <Modal.Title>Update Assignment</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                            <form onSubmit={()=>updateAssignment(assignment.assignment.id)}>
                            

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
                                <span className="input-group-text">Instructions</span>
                                <input className="form-control" type="text" name="assignment_instructions" value={assignmentInstr} onChange={(event) => setAssignmentInstr(event.target.value)}></input>
                                </div>
                            </form>

                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="btn btn-outline-dark" onClick={() => handleClose(index)}>
                                Close
                            </Button>
                            <Button type="submit" variant="btn btn-outline-primary" onClick={()=>updateAssignment(assignment.assignment.id)}>
                                Update
                            </Button>
                            </Modal.Footer>
                        </Modal>
                        </span>
                    }

                    </div>
                )
                }
            )}  

        </div>
    );
}
 
export default CourseViewer;
