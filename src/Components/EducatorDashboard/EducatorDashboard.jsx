import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Background from '../../Documents/notloggedinbackground.jpg';
import './EducatorDashboard.css'

const EducatorDashboard = (props) => {
    const [modalContent, setModalContent] = useState('')
    const [show, setShow] = useState(false);
    const [assignmentsNext3, setAssignmentsNext3] = useState();
    const [assignmentsNext7, setAssignmentsNext7] = useState();
    const [assignmentsLater, setAssignmentsLater] = useState();
    const [assignmentsCompleted, setAssignmentsCompleted] = useState();
    const [archive, setArchived] = useState();

    const handleClose = () => setShow(false);

    function handleShow(assignment) {
        setShow(true);
        setModalContent(assignment)
    }

    // sort assignments
    useEffect(() => {
        if(props.assignments !== undefined && props.assignments.length >0){
            if(props.userInfo && props.userInfo.is_staff===true){
                let assignments3 = [];
                let assignments7 = [];
                let assignmentsLater = [];
                let assignmentsCompleted = [];
                let archived = [];
    
                let today = new Date();
                today.setDate(today.getDate() + 0);
    
                let threeDays = new Date();
                threeDays.setDate(threeDays.getDate() + 3);

                let threeDaysPast = new Date();
                threeDaysPast.setDate(threeDaysPast.getDate() - 3)
        
                let sevenDays = new Date();
                sevenDays.setDate(sevenDays.getDate() + 7)
    
                for (let i=0; i < props.assignments.length; i++) {
                    debugger
                    let assignment_date = new Date(props.assignments[i].assignment_due_date + "T23:59:59");
                   
                    if(assignment_date <= threeDays && assignment_date >= today){
                        assignments3.push(props.assignments[i])
                    }
                    else if(assignment_date > threeDays && assignment_date <= sevenDays){
                        assignments7.push(props.assignments[i])
                    }
                    else if(assignment_date > sevenDays){
                        assignmentsLater.push(props.assignments[i])
                    }
                    else if (assignment_date < today && assignment_date >= threeDaysPast){
                        assignmentsCompleted.push(props.assignments[i])
                    }
                    else if (assignment_date < today && assignment_date <= threeDaysPast){
                        archived.push(props.assignments[i])
                    }
                    
                  }
                
                  setAssignmentsNext3(assignments3);
                  setAssignmentsNext7(assignments7);
                  setAssignmentsLater(assignmentsLater);
                  setAssignmentsCompleted(assignmentsCompleted);
                  setArchived(archived)

            }
            }
      // eslint-disable-next-line
    }, [props.assignments])


    if(props.userInfo){
        return (
            <section className="lists-container">

                <div className="list">
                <h3 className="list-title">Next Three Days</h3>
                <ul className="list-items">
                {assignmentsNext3 && assignmentsNext3.length>0 && assignmentsNext3.map((assignment, index) => {
                    let progress = (assignment.students_completed / assignment.assignment_course.number_of_students) * 100;
                    return (
                        <li>
                            <Button variant="btn btn-list" onClick={() => handleShow(assignment)}>
                            {assignment.assignment_name}
                            </Button>
                            <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar"  style={{'width': `${progress}%`}} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </li>

                    )})}

                {assignmentsNext3 && assignmentsNext3.length===0 &&
                <li>
                <Button variant="btn btn-list" disabled>
                No assignments!
                </Button>
                </li>}
                </ul>
                </div>
                
                <div className="list">
                <h3 className="list-title">Next Seven Days</h3>
                <ul className="list-items">
                {assignmentsNext7 && assignmentsNext7.length>0 && assignmentsNext7.map((assignment, index) => {
                    let progress = (assignment.students_completed / assignment.assignment_course.number_of_students) * 100;
                    return (
                        <li>
                            <Button variant="btn btn-list" onClick={() => handleShow(assignment)}>
                            {assignment.assignment_name}
                            </Button>
                            <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar"  style={{'width': `${progress}%`}} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </li>
                    )})}

                {assignmentsNext7 && assignmentsNext7.length===0 && 
                <li>
                <Button variant="btn btn-list" disabled>
                No assignments!
                </Button>
                </li>}
                </ul>
                </div>

                <div className="list">
                <h3 className="list-title">Later</h3>
                <ul className="list-items">
                {assignmentsLater && assignmentsLater.length>0 && assignmentsLater.map((assignment, index) => {
                    let progress = (assignment.students_completed / assignment.assignment_course.number_of_students) * 100;
                    return (
                        <li>
                            <Button variant="btn btn-list" onClick={() => handleShow(assignment)}>
                            {assignment.assignment_name}
                            </Button>
                            <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar"  style={{'width': `${progress}%`}} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </li>
                    )})}
                    
                {assignmentsLater && assignmentsLater.length===0 && 
                <li>
                <Button variant="btn btn-list" disabled>
                No assignments!
                </Button>
                </li>}
                </ul>
                </div>

               

                <div className="list">
                <h3 className="list-title">Completed Past 3 Days</h3>
                <ul className="list-items">
                {assignmentsCompleted && assignmentsCompleted.length>0 && assignmentsCompleted.map((assignment, index) => {
                    let progress = (assignment.students_completed / assignment.assignment_course.number_of_students) * 100;
                    return (
                        <li>
                            <Button variant="btn btn-list" onClick={() => handleShow(assignment)}>
                            {assignment.assignment_name}
                            </Button>
                            <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar"  style={{'width': `${progress}%`}} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </li>
                    )})}

                {assignmentsCompleted && assignmentsCompleted.length===0 && 
                <li>
                <Button variant="btn btn-list" disabled>
                No assignments!
                </Button>
                </li>}
                </ul>
                </div>

                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{modalContent && <span>{modalContent.assignment_name}</span>}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalContent && 
                    <div>
                        <p><strong>Description:</strong> {modalContent.assignment_desc}</p>
                        <p><strong>Instructions:</strong> {modalContent.assignment_instructions}</p>
                        <br></br>
                        <p><u>Due Date:</u> {modalContent.assignment_due_date}</p>
                        <p><u>Course:</u> {modalContent.assignment_course.course_name}</p>
                        <br></br>
                        <mark>Status</mark>
                        <li><strong>Students Enrolled:</strong> {modalContent.assignment_course.number_of_students}</li>
                        <li><strong>Viewed:</strong> {modalContent.students_viewed}</li>
                        <li><strong>In Progress:</strong> {modalContent.students_in_progress}</li>
                        <li><strong>Completed:</strong> {modalContent.students_completed}</li>
                    
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
    else{
        return(
            <img src={Background} alt="school books with apple" style={{ "height": "80%", "width": "100%","marginTop":'5%'}}></img>
        )
    }
   
}
 
export default EducatorDashboard;