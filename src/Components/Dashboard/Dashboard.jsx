import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import UpdateAssignmentStatus from '../UpdateAssignmentStatus/UpdateAssignmentStatus';

const Dashboard = (props) => {
    const [assignmentsNext3, setAssignmentsNext3] = useState(undefined);
    const [assignmentsNext7, setAssignmentsNext7] = useState(undefined);
    const [assignmentsLater, setAssignmentsLater] = useState(undefined);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if(props.assignments != undefined){
            let assignments3 = [];
            let assignments7 = [];
            let assignments = [];
            let threeDays = new Date();
            threeDays.setDate(threeDays.getDate() + 3);
    
            let sevenDays = new Date();
            sevenDays.setDate(sevenDays.getDate() + 7)

            for (let i=0; i < props.assignments.length; i++) {
                let assignment_date = new Date(props.assignments[i].assignment.assignment_due_date + "T00:00:00");
                debugger
                if(assignment_date <= threeDays){
                    assignments3.push(props.assignments[i])
                }
                else if(assignment_date > threeDays && assignment_date <= sevenDays){
                    assignments7.push(props.assignments[i])
                }
                else{
                    assignments.push(props.assignments[i])
                }
              }
            
              setAssignmentsNext3(assignments3);
              setAssignmentsNext7(assignments7);
              setAssignmentsLater(assignments)
            }
        
        
      // eslint-disable-next-line
    }, [props.assignments])


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
                <ul>
                    {assignmentsNext3 && assignmentsNext3.length > 0 && assignmentsNext3.map((assignment, index) => {
                                return (
                                    <li className="assignment-list" key={assignment.assignment.id}>
                                        <span id="view-assignment-3">
                                            <Button variant="btn btn-outline-secondary assignment-button" onClick={handleShow} style={{ "marginRight": "1em" }}>
                                                <p style={{'textAlign':'left','marginBottom':'2px'}}>{assignment.assignment.assignment_name}</p>
                                                <p style={{'textAlign':'left','marginBottom':'2px'}}>Due Date: {assignment.assignment.assignment_due_date}</p>
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
                                                        <p><small>{assignment.course.course_name}</small></p>
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
                                        </span> 
                                       <UpdateAssignmentStatus assignment={assignment} studentInfo={props.studentInfo} />
                                    </li>
                                )
            
                        }
                        )}

                        {assignmentsNext3 && assignmentsNext3.length ===0 && <p> No assignments!</p>}
                    </ul>
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
                <ul>
                    {assignmentsNext7 && assignmentsNext7.length>0 && assignmentsNext7.map((assignment, index) => {
                                return (
                                    <li className="assignment-list" key={assignment.assignment.id}>
                                    <span id="view-assignment-7">
                                            <Button variant="btn btn-outline-secondary assignment-button" onClick={handleShow} style={{ "marginRight": "1em" }}>
                                                <p style={{'textAlign':'left','marginBottom':'2px'}}>{assignment.assignment.assignment_name}</p>
                                                <p style={{'textAlign':'left','marginBottom':'2px'}}>Due Date: {assignment.assignment.assignment_due_date}</p>
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
                                                        <p><small>{assignment.course.course_name}</small></p>
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
                                        </span> 
                                        <UpdateAssignmentStatus assignment={assignment} studentInfo={props.studentInfo}/>
                                        </li>
                                )
            
                        }
                        )}

                        {assignmentsNext7 && assignmentsNext7.length ===0 && <p> No assignments!</p>}
                    </ul>
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
                <ul>
                    {assignmentsLater && assignmentsLater.length > 0 && assignmentsLater.map((assignment, index) => {
                            return (
                                <li className="assignment-list" key={assignment.assignment.id}>
                                <span id="view-assignment-7">
                                <Button variant="btn btn-outline-secondary assignment-button" onClick={handleShow} style={{ "marginRight": "1em" }}>
                                    <p style={{'textAlign':'left','marginBottom':'2px'}}>{assignment.assignment.assignment_name}</p>
                                    <p style={{'textAlign':'left','marginBottom':'2px'}}>Due Date: {assignment.assignment.assignment_due_date}</p>
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
                                            <p><small>{assignment.course.course_name}</small></p>
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
                            </span> 
                            <UpdateAssignmentStatus assignment={assignment} studentInfo={props.studentInfo}/>
                            </li>
                            )
        
                    }
                    )}
                    {assignmentsLater && assignmentsLater.length ===0 && <p> No assignments!</p>}
                </ul>
                </div>
                </div>
            </div>
            </div>
        
    
        </div>
     );
}
    

 
export default Dashboard;