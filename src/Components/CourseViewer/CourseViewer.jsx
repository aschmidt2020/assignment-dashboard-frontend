import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

const CourseViewer = (props) => {
    const {state} = useLocation();
    const { id, course, educator } = state;
    const [assignments, setAssignments] = useState();

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

    return (
        <div>
            {assignments && assignments.map((assignment, index) => {
                return(
                    <p>{assignment.assignment.assignment_name}</p>
                )
                }
            )}  

        </div>
    );
}
 
export default CourseViewer;
