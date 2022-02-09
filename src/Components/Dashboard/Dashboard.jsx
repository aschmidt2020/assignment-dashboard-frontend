import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import UpdateAssignmentStatus from '../UpdateAssignmentStatus/UpdateAssignmentStatus';

const Dashboard = (props) => {
    const [assignmentsAndStatus, setAssignmentsAndStatus] = useState();
    const [assignmentsNext3, setAssignmentsNext3] = useState(undefined);
    const [assignmentsNext7, setAssignmentsNext7] = useState(undefined);
    const [assignmentsLater, setAssignmentsLater] = useState(undefined);
    const [assignmentsOverdue, setAssignmentsOverdue] = useState();
    const [assignmentsCompleted, setAssignmentsCompleted] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // sort assignments
    useEffect(() => {
        debugger
        if(assignmentsAndStatus != undefined && assignmentsAndStatus.length >0){
            let assignments3 = [];
            let assignments7 = [];
            let assignments = [];
            let overdue = [];
            let completed = []

            let today = new Date();
            today.setDate(today.getDate() + 0);

            let threeDays = new Date();
            threeDays.setDate(threeDays.getDate() + 3);
    
            let sevenDays = new Date();
            sevenDays.setDate(sevenDays.getDate() + 7)

            for (let i=0; i < assignmentsAndStatus.length; i++) {
                
                let assignment_date = new Date(assignmentsAndStatus[i].assignment.assignment_due_date + "T00:00:00");
                if(assignmentsAndStatus[i].assignment_status === "Completed"){
                    completed.push(assignmentsAndStatus[i])
                }

                else if(assignmentsAndStatus[i].assignment_status !== "Completed"){
                    if(assignment_date <= threeDays){
                        assignments3.push(assignmentsAndStatus[i])
                    }
                    else if(assignment_date > threeDays && assignment_date <= sevenDays){
                        assignments7.push(assignmentsAndStatus[i])
                    }
                    else if(assignment_date > sevenDays){
                        assignments.push(assignmentsAndStatus[i])
                    }
                    else if (assignment_date < today){
                        overdue.push(assignmentsAndStatus[i])
                    }
                }
              }
            
              setAssignmentsNext3(assignments3);
              setAssignmentsNext7(assignments7);
              setAssignmentsLater(assignments);
              setAssignmentsCompleted(completed);
              setAssignmentsOverdue(overdue)
            }
        
        
      // eslint-disable-next-line
    }, [assignmentsAndStatus])

    //compare assignments with assignment statuses
    useEffect(() => {
        debugger
        let assignmentAndStatus = [];
        if(props.assignments != undefined && props.assignments.length >0 && props.studentAssignmentStatus != undefined){
            for (let i=0; i < props.assignments.length; i++) {
                let indexStatus = props.studentAssignmentStatus.findIndex(assignment => assignment.assignment.id === props.assignments[i].id)
                if(indexStatus > -1){
                    assignmentAndStatus.push(props.studentAssignmentStatus[indexStatus])
                }
                else{
                    assignmentAndStatus.push(
                        {
                        assignment: props.assignments[i],
                        assignment_status: "Not Started",
                        id: 0,
                        student: props.studentInfo
                        }
                    )
                }
            
            }}
        setAssignmentsAndStatus(assignmentAndStatus)
        
      // eslint-disable-next-line
    }, [props.assignments, props.studentAssignmentStatus])

    return ( 
        <div>
            <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Due Next 3 Days
                </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
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
                            {assignmentsNext3 && assignmentsNext3.length>0 && assignmentsNext3.map((assignment, index) => {
                                return (
                                    <tr key={assignment.assignment.id}>
                                        <td>
                                        <Button variant="btn btn-outline-secondary assignment-button" onClick={handleShow} style={{ "marginRight": "1em" }}>
                                            {assignment.assignment.assignment_name}
                                        </Button>

                                        <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                <Modal.Title>Assignment</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <h5>{assignment.assignment.assignment_name}</h5>
                                                        <p><small>{assignment.assignment.assignment_desc}</small></p>
                                                        <p>{assignment.assignment.assignment_instructions}</p>
                                                    </div>
                                                    <div className='col'>
                                                        <p><small>{assignment.assignment.assignment_course.course_name}</small></p>
                                                        <p>{assignment.assignment.assignment_due_date}</p>
                                                    </div>
                                                </div>

                                                </Modal.Body>
                                                <Modal.Footer>
                                                {props.userInfo.is_staff===true && 
                                                    <Button variant="btn btn-outline-dark" onClick={handleClose}>
                                                    Close
                                                    </Button>
                                                }
                                                {props.userInfo.is_staff===false &&
                                                    <div>
                                                        <Button variant="btn btn-outline-dark" onClick={handleClose}>
                                                            Close
                                                        </Button>
                                                        <Button type="submit" variant="btn btn-outline-primary" onClick={handleClose}>
                                                            Submit
                                                        </Button>
                                                    </div>
                                                }
                                                </Modal.Footer>
                                            </Modal>
                                        </td>
                                        <td>{assignment.assignment.assignment_course.course_name}</td>
                                        <td>{assignment.assignment.assignment_due_date}</td>
                                        {props.userInfo.is_staff===false && 
                                        <td><UpdateAssignmentStatus assignment={assignment} currentLabel={assignment.assignment_status} studentInfo={props.studentInfo} getAssignments={props.getAssignments}/></td>
                                        }
                                        {props.userInfo.is_staff===true &&
                                        <td>
                                            Students: {assignment.assignment.assignment_course.number_of_students}
                                            # Viewed: {assignment.assignment.students_viewed}
                                            # In Progress: {assignment.assignment.students_in_progress}
                                            # Completed: {assignment.assignment.students_completed}
                                        </td>
                                        }
                                    </tr>
                                    
                                            
                                )
                                
                            }
                            )}
                            {assignmentsNext3 && assignmentsNext3.length===0 && <td>No assignments!</td>}
                        </tbody>

                        
                        </table>
                    </span> 
                </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Due Next 7 Days
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
                            {assignmentsNext7 && assignmentsNext7.length>0 && assignmentsNext7.map((assignment, index) => {
                                return (
                                    <tr key={assignment.assignment.id}>
                                        <td>
                                        <Button variant="btn btn-outline-secondary assignment-button" onClick={handleShow} style={{ "marginRight": "1em" }}>
                                            {assignment.assignment.assignment_name}
                                        </Button>

                                        <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                <Modal.Title>Assignment</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <h5>{assignment.assignment.assignment_name}</h5>
                                                        <p><small>{assignment.assignment.assignment_desc}</small></p>
                                                        <p>{assignment.assignment.assignment_instructions}</p>
                                                    </div>
                                                    <div className='col'>
                                                        <p><small>{assignment.assignment.assignment_course.course_name}</small></p>
                                                        <p>{assignment.assignment.assignment_due_date}</p>
                                                    </div>
                                                </div>

                                                </Modal.Body>
                                                <Modal.Footer>
                                                {props.userInfo.is_staff===true && 
                                                    <Button variant="btn btn-outline-dark" onClick={handleClose}>
                                                    Close
                                                    </Button>
                                                }
                                                {props.userInfo.is_staff===false &&
                                                    <div>
                                                        <Button variant="btn btn-outline-dark" onClick={handleClose}>
                                                            Close
                                                        </Button>
                                                        <Button type="submit" variant="btn btn-outline-primary" onClick={handleClose}>
                                                            Submit
                                                        </Button>
                                                    </div>
                                                }
                                                </Modal.Footer>
                                            </Modal>
                                        </td>
                                        <td>{assignment.assignment.assignment_course.course_name}</td>
                                        <td>{assignment.assignment.assignment_due_date}</td>
                                        {props.userInfo.is_staff===false && 
                                        <td><UpdateAssignmentStatus assignment={assignment} currentLabel={assignment.assignment_status} studentInfo={props.studentInfo} getAssignments={props.getAssignments}/></td>
                                        }
                                        {props.userInfo.is_staff===true &&
                                        <td>
                                            Students: {assignment.assignment.assignment_course.number_of_students}
                                            # Viewed: {assignment.assignment.students_viewed}
                                            # In Progress: {assignment.assignment.students_in_progress}
                                            # Completed: {assignment.assignment.students_completed}
                                        </td>
                                        }
                                    </tr>
                                    
                                            
                                )
                                
                            }
                            )}
                        </tbody>

                        
                        </table>
                    </span> 
                </div>
                </div>
            </div>

             <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Due Later
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
                            {assignmentsLater && assignmentsLater.length>0 && assignmentsLater.map((assignment, index) => {
                                return (
                                    <tr key={assignment.assignment.id}>
                                        <td>
                                        <Button variant="btn btn-outline-secondary assignment-button" onClick={handleShow} style={{ "marginRight": "1em" }}>
                                            {assignment.assignment.assignment_name}
                                        </Button>

                                        <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                <Modal.Title>Assignment</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <h5>{assignment.assignment.assignment_name}</h5>
                                                        <p><small>{assignment.assignment.assignment_desc}</small></p>
                                                        <p>{assignment.assignment.assignment_instructions}</p>
                                                    </div>
                                                    <div className='col'>
                                                        <p><small>{assignment.assignment.assignment_course.course_name}</small></p>
                                                        <p>{assignment.assignment.assignment_due_date}</p>
                                                    </div>
                                                </div>

                                                </Modal.Body>
                                                <Modal.Footer>
                                                {props.userInfo.is_staff===true && 
                                                    <Button variant="btn btn-outline-dark" onClick={handleClose}>
                                                    Close
                                                    </Button>
                                                }
                                                {props.userInfo.is_staff===false &&
                                                    <div>
                                                        <Button variant="btn btn-outline-dark" onClick={handleClose}>
                                                            Close
                                                        </Button>
                                                        <Button type="submit" variant="btn btn-outline-primary" onClick={handleClose}>
                                                            Submit
                                                        </Button>
                                                    </div>
                                                }
                                                </Modal.Footer>
                                            </Modal>
                                        </td>
                                        <td>{assignment.assignment.assignment_course.course_name}</td>
                                        <td>{assignment.assignment.assignment_due_date}</td>
                                        {props.userInfo.is_staff===false && 
                                        <td><UpdateAssignmentStatus assignment={assignment} currentLabel={assignment.assignment_status} studentInfo={props.studentInfo} getAssignments={props.getAssignments}/></td>
                                        }
                                        {props.userInfo.is_staff===true &&
                                        <td>
                                            Students: {assignment.assignment.assignment_course.number_of_students}
                                            # Viewed: {assignment.assignment.students_viewed}
                                            # In Progress: {assignment.assignment.students_in_progress}
                                            # Completed: {assignment.assignment.students_completed}
                                        </td>
                                        }
                                    </tr>
                                    
                                            
                                )
                                
                            }
                            )}
                        </tbody>
                        </table>
                    </span> 
                </div>
                </div>

                {props.userInfo && props.userInfo.is_staff===false &&
                             <div className="accordion-item">
                             <h2 className="accordion-header" id="headingFour">
                             <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                 Overdue
                             </button>
                             </h2>
                             <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                             <div className="accordion-body">
                                     <span id="view-assignment-overdue">
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
                                         {assignmentsOverdue && assignmentsOverdue.length>0 && assignmentsOverdue.map((assignment, index) => {
                                             return (
                                                 <tr key={assignment.assignment.id}>
                                                     <td>
                                                     <Button variant="btn btn-outline-secondary assignment-button" onClick={handleShow} style={{ "marginRight": "1em" }}>
                                                         {assignment.assignment.assignment_name}
                                                     </Button>
             
                                                     <Modal show={show} onHide={handleClose}>
                                                             <Modal.Header closeButton>
                                                             <Modal.Title>Assignment</Modal.Title>
                                                             </Modal.Header>
                                                             <Modal.Body>
                                                             <div className='row'>
                                                                 <div className='col'>
                                                                     <h5>{assignment.assignment.assignment_name}</h5>
                                                                     <p><small>{assignment.assignment.assignment_desc}</small></p>
                                                                     <p>{assignment.assignment.assignment_instructions}</p>
                                                                 </div>
                                                                 <div className='col'>
                                                                     <p><small>{assignment.assignment.assignment_course.course_name}</small></p>
                                                                     <p>{assignment.assignment.assignment_due_date}</p>
                                                                 </div>
                                                             </div>
             
                                                             </Modal.Body>
                                                             <Modal.Footer>
                                                             {props.userInfo.is_staff===true && 
                                                                 <Button variant="btn btn-outline-dark" onClick={handleClose}>
                                                                 Close
                                                                 </Button>
                                                             }
                                                             {props.userInfo.is_staff===false &&
                                                                 <div>
                                                                     <Button variant="btn btn-outline-dark" onClick={handleClose}>
                                                                         Close
                                                                     </Button>
                                                                     <Button type="submit" variant="btn btn-outline-primary" onClick={handleClose}>
                                                                         Submit
                                                                     </Button>
                                                                 </div>
                                                             }
                                                             </Modal.Footer>
                                                         </Modal>
                                                     </td>
                                                     <td>{assignment.assignment.assignment_course.course_name}</td>
                                                     <td>{assignment.assignment.assignment_due_date}</td>
                                                     {props.userInfo.is_staff===false && 
                                                     <td><UpdateAssignmentStatus assignment={assignment} currentLabel={assignment.assignment_status} studentInfo={props.studentInfo} getAssignments={props.getAssignments}/></td>
                                                     }
                                                     {props.userInfo.is_staff===true &&
                                                     <td>
                                                         Students: {assignment.assignment.assignment_course.number_of_students}
                                                         # Viewed: {assignment.assignment.students_viewed}
                                                         # In Progress: {assignment.assignment.students_in_progress}
                                                         # Completed: {assignment.assignment.students_completed}
                                                     </td>
                                                     }
                                                 </tr>
                                                 
                                                         
                                             )
                                             
                                         }
                                         )}
                                     </tbody>
                                     </table>
                                 </span> 
                             </div>
                             </div>
                             </div>
                }

                {props.userInfo && props.userInfo.is_staff===false &&
                             <div className="accordion-item">
                             <h2 className="accordion-header" id="headingFive">
                             <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                 Completed
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
                                         {assignmentsCompleted && assignmentsCompleted.length>0 && assignmentsCompleted.map((assignment, index) => {
                                             return (
                                                 <tr key={assignment.assignment.id}>
                                                     <td>
                                                     <Button variant="btn btn-outline-secondary assignment-button" onClick={handleShow} style={{ "marginRight": "1em" }}>
                                                         {assignment.assignment.assignment_name}
                                                     </Button>
             
                                                     <Modal show={show} onHide={handleClose}>
                                                             <Modal.Header closeButton>
                                                             <Modal.Title>Assignment</Modal.Title>
                                                             </Modal.Header>
                                                             <Modal.Body>
                                                             <div className='row'>
                                                                 <div className='col'>
                                                                     <h5>{assignment.assignment.assignment_name}</h5>
                                                                     <p><small>{assignment.assignment.assignment_desc}</small></p>
                                                                     <p>{assignment.assignment.assignment_instructions}</p>
                                                                 </div>
                                                                 <div className='col'>
                                                                     <p><small>{assignment.assignment.assignment_course.course_name}</small></p>
                                                                     <p>{assignment.assignment.assignment_due_date}</p>
                                                                 </div>
                                                             </div>
             
                                                             </Modal.Body>
                                                             <Modal.Footer>
                                                             {props.userInfo.is_staff===true && 
                                                                 <Button variant="btn btn-outline-dark" onClick={handleClose}>
                                                                 Close
                                                                 </Button>
                                                             }
                                                             {props.userInfo.is_staff===false &&
                                                                 <div>
                                                                     <Button variant="btn btn-outline-dark" onClick={handleClose}>
                                                                         Close
                                                                     </Button>
                                                                     <Button type="submit" variant="btn btn-outline-primary" onClick={handleClose}>
                                                                         Submit
                                                                     </Button>
                                                                 </div>
                                                             }
                                                             </Modal.Footer>
                                                         </Modal>
                                                     </td>
                                                     <td>{assignment.assignment.assignment_course.course_name}</td>
                                                     <td>{assignment.assignment.assignment_due_date}</td>
                                                     {props.userInfo.is_staff===false && 
                                                     <td><UpdateAssignmentStatus assignment={assignment} currentLabel={assignment.assignment_status} studentInfo={props.studentInfo} getAssignments={props.getAssignments}/></td>
                                                     }
                                                     {props.userInfo.is_staff===true &&
                                                     <td>
                                                         Students: {assignment.assignment.assignment_course.number_of_students}
                                                         # Viewed: {assignment.assignment.students_viewed}
                                                         # In Progress: {assignment.assignment.students_in_progress}
                                                         # Completed: {assignment.assignment.students_completed}
                                                     </td>
                                                     }
                                                 </tr>
                                                 
                                                         
                                             )
                                             
                                         }
                                         )}
                                     </tbody>
                                     </table>
                                 </span> 
                             </div>
                             </div>
                             </div>
                }
                </div>
        </div>
        </div>

     );
}
    

 
export default Dashboard;