import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SearchResults = (props) => {
    const navigate = useNavigate();
    const [show, setShow] = useState({ show: false, assignmentId: '' });

    function toggleShow(assignmentId) {
        setShow({ show: !show.show, assignmentId: assignmentId })
    }


    function navigateCourse(course) {
        navigate(`/course/${course.course.course_name.split(' ').join('')}`, { state: { ...course } });

    }

    return (
        <div>
            <h5>Assignments:</h5>
            {props.searchResultsAssignments && props.searchResultsAssignments.length > 0 && props.searchResultsAssignments.map((result, index) => {
                return (
                    <div>
                        <button className="btn btn-link" onClick={() => toggleShow(result.id)}>
                            {result.assignment_name}
                        </button>

                        {show.show === true && show.assignmentId === result.id &&
                            <div className='row' style={{ 'marginLeft': '1em' }}>
                                <li><strong>Due Date:</strong> {result.assignment_due_date}</li>
                                <li><strong>Description:</strong> {result.assignment_desc}</li>
                                <li><strong>Instructions:</strong> {result.assignment_instructions}</li>

                                <li><strong>Course:</strong>
                                    <button className='btn link-secondary' onClick={() => navigateCourse({ course: result.assignment_course })}><u>{result.assignment_course.course_name} <i className="bi bi-arrow-right"></i></u></button>
                                </li>
                            </div>
                        }

                    </div>
                );
            })}
            {props.searchResultsAssignments && props.searchResultsAssignments.length === 0 && <p>No matching assignments.</p>}
            <br></br>
            <h5>Courses:</h5>
            {props.searchResultsCourses && props.searchResultsCourses.length > 0 && props.searchResultsCourses.map((result, index) => {
                return (
                    <li><button className='btn btn-link' onClick={() => navigateCourse(result)}>{result.course.course_name}</button></li>
                );
            })}

            {props.searchResultsCourses && props.searchResultsCourses.length === 0 && <p>No matching courses.</p>}

        </div>
    )

}
export default SearchResults;