import React, { useState } from 'react';
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
        setSelectedCourse(undefined);
        handleReset();
    }
    async function addAssignment() {
        const jwt = localStorage.getItem("token");
        await axios({
            method: "post",
            url: `assignment/educator/addassignment/course_id/${selectedCourse.id}/`,
            headers: {
                Authorization: "Bearer " + jwt
            },
            data: {
                assignment_course: selectedCourse.id,
                assignment_name: formValues.assignment_name,
                assignment_desc: formValues.assignment_desc,
                assignment_due_date: formValues.assignment_due_date,
                assignment_instructions: formValues.assignment_instructions,
                students_completed: 0,
                students_in_progress: 0,
                students_viewed: 0,
                assignment_link: formValues.assignment_link
            }
        }).then(response => {
            props.getAssignments();
            handleClose();
            // window.location.reload();
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
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ 'marginBottom': '1em' }}>
                            {selectedCourse && <span>{selectedCourse.course_name}</span>}
                            {!selectedCourse && <span>Select Course</span>}
                        </button>

                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            {props.courses && props.courses.map((course) => {
                                return (
                                    <li key={course.course.id}><button className='dropdown-item' onClick={() => setSelectedCourse(course.course)}>{course.course.course_name}</button></li>
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
                            <span className="input-group-text">Assignment Link:</span>
                            <input className="form-control" type="text" name="assignment_link" value={formValues.assignment_link} onChange={handleChange}></input>
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label">Instructions:</label>
                            <textarea className="form-control text-area text-box multi-line w-100" type="text" name="assignment_instructions" value={formValues.assignment_instructions} onChange={handleChange} rows="7"></textarea>
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