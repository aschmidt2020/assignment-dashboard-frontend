import React, { useEffect } from 'react';
import axios from 'axios';
import useDrivePicker from 'react-google-drive-picker'
import { useStore } from '../../app/store';

const UpdateAssignmentStatus = (props) => {
    const studentInfo = useStore((state) => state.studentInfo);
    const [openPicker, data] = useDrivePicker();

    const handleOpenPicker = () => {
        openPicker({
            clientId: process.env.REACT_APP_DRIVE_CLIENT_ID,
            developerKey: process.env.REACT_APP_API_KEY_DRIVE_PICKER,
            viewId: "DOCS",
            //token: 
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: true,
            // customViews: customViewsArray, // custom view
        })
    }

    useEffect(() => {
        // do anything with the selected/uploaded files
        if (data) {
            data.docs.map(i => console.log(i.name));
            updateAssignmentStatus('Completed')
        }
        // eslint-disable-next-line
    }, [data])

    function handleClickViewed() {
        updateAssignmentStatus('Viewed')
    }

    function handleClickInProgress() {
        updateAssignmentStatus('In Progress')
    }

    function handleClickCompleted() {
        updateAssignmentStatus('Completed')
    }

    async function updateAssignmentStatus(status) {
        const jwt = localStorage.getItem("token");
        await axios({
            method: "put",
            url: `assignment/student/updateassignmentstatus/student_id/${studentInfo.id}/assignment_id/${props.assignment.id}/`,
            headers: {
                Authorization: "Bearer " + jwt
            },
            data: {
                assignment: props.assignment.id,
                student: studentInfo.id,
                assignment_prev_status: props.currentLabel,
                assignment_status: status
            }
        }).then(response => {
            useStore.getState().getAssignments(studentInfo.id, false)
        }).catch(error => {
            alert(error)
        })
    }

    return (
        <div>
            {props.assignment &&
                <div>
                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" id={props.assignment.id} data-bs-toggle="dropdown" aria-expanded="false">
                        {props.currentLabel}
                    </button>

                    <ul className="dropdown-menu" aria-labelledby={props.assignment.id}>
                        <li><button className='dropdown-item' onClick={handleClickViewed}>Viewed</button></li>
                        <li><button className='dropdown-item' onClick={handleClickInProgress}>In Progress</button></li>
                        <li><button className='dropdown-item' onClick={handleClickCompleted}>Completed</button></li>
                        <li><button className='dropdown-item' onClick={() => handleOpenPicker()}>Upload Assignment</button></li>
                    </ul>
                </div>
            }
        </div>
    );
}

export default UpdateAssignmentStatus;