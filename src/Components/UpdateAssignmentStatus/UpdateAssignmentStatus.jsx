import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const UpdateAssignmentStatus = (props) => {
    const [assignmentStatus, setAssignmentStatus] = useState();
    const navigate = useNavigate();

    function handleClickViewed() {
        setAssignmentStatus('Viewed');
        updateAssignmentStatus('Viewed')
    }

    function handleClickInProgress(){
        setAssignmentStatus('In Progress');
        updateAssignmentStatus('In Progress')
    }

    function handleClickSubmit(assignment){
        setAssignmentStatus('Completed');
        navigate(`/assignment/submit`, { state: {...assignment}});
        // updateAssignmentStatus('Completed')

    }

    async function updateAssignmentStatus(status){
        debugger
        const jwt = localStorage.getItem("token");
        await axios({
            method: "put",
            url: `http://127.0.0.1:8000/api/assignment/student/updateassignmentstatus/assignment_id/${props.assignment.assignment.id}/`,
            headers: {
            Authorization: "Bearer " + jwt
            },
            data: {
                assignment: props.assignment.assignment.id,
                student: props.studentInfo.id,
                assignment_prev_status: props.currentLabel,
                assignment_status: status
            }
        }).then(response => {
            props.getAssignments();
            window.location.reload();
        }).catch(error => {
            alert(error)
        })
    }

    return ( 
        <div>
            {props.assignment &&
                <div>
                    <button className="btn btn-outline-dark dropdown-toggle" type="button" id={props.assignment.assignment.id} data-bs-toggle="dropdown" aria-expanded="false">
                    {props.currentLabel}
                    </button>

                    <ul className="dropdown-menu" aria-labelledby={props.assignment.assignment.id}>
                        <li><button onClick={handleClickViewed}>Viewed</button></li>
                        <li><button onClick={handleClickInProgress}>In Progress</button></li>
                        <li><button onClick={() => handleClickSubmit(props.assignment)}>Submit</button></li>
                    </ul>
                </div>
            }
        </div>
     );
}
 
export default UpdateAssignmentStatus;