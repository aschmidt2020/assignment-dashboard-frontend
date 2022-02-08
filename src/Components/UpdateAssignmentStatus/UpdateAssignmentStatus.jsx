import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateAssignmentStatus = (props) => {
    const [assignmentStatus, setAssignmentStatus] = useState();

    function handleClickViewed() {
        setAssignmentStatus('Viewed');
        updateAssignmentStatus('Viewed')
    }

    function handleClickInProgress(){
        setAssignmentStatus('In Progress');
        updateAssignmentStatus('In Progress')
    }

    function handleClickCompleted(){
        setAssignmentStatus('Completed');
        updateAssignmentStatus('In Progress')

    }

    async function updateAssignmentStatus(status){
        debugger
        const jwt = localStorage.getItem("token");
        await axios({
            method: "put",
            url: `http://127.0.0.1:8000/api/assignment/student/updateassignmentstatus/${props.assignment.assignment.id}/`,
            headers: {
            Authorization: "Bearer " + jwt
            },
            data: {
                assignment: props.assignment.assignment.id,
                student: props.studentInfo.id,
                assignment_status: status
            }
        }).then(response => {
            props.getAssignments();
        }).catch(error => {
            alert(error)
        })
    }

    return ( 
        <div>
            {props.assignment &&
                <div>
                    <button className="btn btn-outline-dark dropdown-toggle" type="button" id={props.assignment.assignment.id} data-bs-toggle="dropdown" aria-expanded="false">
                    Update Status
                    </button>

                    <ul className="dropdown-menu" aria-labelledby={props.assignment.assignment.id}>
                        <li><button onClick={handleClickViewed}>Viewed</button></li>
                        <li><button onClick={handleClickInProgress}>In Progress</button></li>
                        <li><button onClick={handleClickCompleted}>Completed</button></li>
                    </ul>
                </div>
            }
        </div>
     );
}
 
export default UpdateAssignmentStatus;