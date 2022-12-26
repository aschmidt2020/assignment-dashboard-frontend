import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

const SearchResults = (props) => {
    const navigate = useNavigate();
    const [show, setShow] = useState({ show: false, assignmentId: '' });
    const { state } = useLocation();

    function toggleShow(assignmentId) {
        setShow({ show: !show.show, assignmentId: assignmentId })
    }

    function navigateCourse(course) {
        navigate(`/course/${course.course.course_name.split(' ').join('')}`, { state: { ...course } });
    }

    return (
        <div>
            <h5>Assignments:</h5>
            {state.searchResultsAssignments && state.searchResultsAssignments.length > 0 && state.searchResultsAssignments.map((result, index) => {
                return (
                    <div key={index}>
                        <button className="btn btn-link" onClick={() => toggleShow(result.id)}>
                            {result.assignment_name}
                        </button>

                        {show.show && show.assignmentId === result.id &&
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
            {state.searchResultsAssignments && state.searchResultsAssignments.length === 0 && <li key='noAssignments'>No matching assignments.</li>}
            <br></br>
            <h5>Courses:</h5>
            {state.searchResultsCourses && state.searchResultsCourses.length > 0 && state.searchResultsCourses.map((result, index) => {
                return (
                    <li key={index}><button className='btn btn-link' onClick={() => navigateCourse(result)}>{result.course.course_name}</button></li>
                );
            })}
            {state.searchResultsCourses && state.searchResultsCourses.length === 0 && <li key='noCourses'>No matching courses.</li>}
        </div>
    )

}
export default SearchResults;