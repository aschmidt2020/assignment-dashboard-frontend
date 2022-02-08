import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useForm from "../CustomHooks/useForm";
import axios from 'axios';

const AddAssignment = (props) => {
    const { formValues, handleChange, handleSubmit, handleReset } = useForm(addAssignment);
    const [selectedCourse, setSelectedCourse] = useState();
    const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleClose() {
        setShow(false);
        handleReset();

    }
    async function addAssignment() {
        const jwt = localStorage.getItem("token");
        await axios({
            method: "post",
            url: `http://127.0.0.1:8000/api/assignment/educator/addassignment/${selectedCourse.id}/`,
            headers: {
            Authorization: "Bearer " + jwt
            },
            data: {
                assignment_name: formValues.assignment_name,
                assignment_desc: formValues.assignment_desc,
                assignment_due_date: formValues.assignment_due_date,
                assignment_instructions: formValues.assignment_instructions,
                assignment_archived: "False"
            }
        }).then(response => {
            props.getAssignments();
        }).catch(error => {
            alert(error)
        })
      }

    return (
        <span id="add-assignment">
            <Button variant="btn btn-outline-primary" onClick={handleShow} style={{ "marginRight": "1em" }}>
                Add Assignment
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Assignment</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <div className="dropdown">
                
                    {selectedCourse &&
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {selectedCourse.course_name}
                    </button>}
                    {!selectedCourse && 
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Select Course
                    </button>
                    }

                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {props.courses && props.courses.map((course) => {
                        return(
                            <li><button onClick={() => setSelectedCourse(course.course)}>{course.course.course_name}</button></li>
                        )
                    })}

                </ul>
                </div>

                <form onSubmit={handleSubmit}>
                

                    <div className="input-group mb-3">
                    <span className="input-group-text">Assignment Name</span>
                    <input className="form-control" type="text" name="assignment_name" value={formValues.assignment_name} onChange={handleChange}></input>
                    </div>

                    <div className="input-group mb-3">
                    <span className="input-group-text">Description</span>
                    <input className="form-control" type="text" name="assignment_desc" value={formValues.assignment_desc} onChange={handleChange}></input>
                    </div>

                    <div className="input-group mb-3">
                    <span className="input-group-text">Due Date</span>
                    <input className="form-control" type="date" name="assignment_due_date" value={formValues.assignment_due_date} onChange={handleChange}></input>
                    </div>

                    <div className="input-group mb-3">
                    <span className="input-group-text">Instructions</span>
                    <input className="form-control" type="text" name="assignment_instructions" value={formValues.assignment_instructions} onChange={handleChange}></input>
                    </div>
                </form>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="btn btn-outline-dark" onClick={handleClose}>
                    Close
                </Button>
                <Button type="submit" variant="btn btn-outline-primary" onClick={handleSubmit}>
                    Add
                </Button>
                </Modal.Footer>
            </Modal>
            </span>
    );
}
 
export default AddAssignment;