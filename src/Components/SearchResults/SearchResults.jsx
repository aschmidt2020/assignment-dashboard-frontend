import React, { useState } from 'react';
import { useNavigate} from "react-router-dom";

const SearchResults = (props) => {
    const navigate = useNavigate();
    const [show, setShow] = useState({show: false, assignmentId: ''});

    function toggleShow(assignmentId){
        setShow({show: !show.show, assignmentId: assignmentId})
    }


    function navigateCourse(course) {
        navigate(`/course/${course.course.course_name.split(' ').join('')}`, { state: {...course}});

    }

    return ( 
        <div>
            <h5>Assignments:</h5>
            {props.searchResultsAssignments && props.searchResultsAssignments.length > 0 && props.searchResultsAssignments.map((result, index) => {
                return(
                <div>
                <button className="btn btn-link" onClick={() => toggleShow(result.id)}>
                    {result.assignment_name}
                </button>
                
                {show.show===true && show.assignmentId === result.id && 
                    <div className='row' style={{'marginLeft':'1em'}}>
                        <p><strong>Due Date:</strong> {result.assignment_due_date}</p>
                        <p><strong>Description:</strong> {result.assignment_desc}</p>    
                        <p><strong>Instructions:</strong> {result.assignment_instructions}</p>    
                        
                        <p><strong>Course:</strong> 
                        <button className='btn btn-link' onClick={() => navigateCourse({course: result.assignment_course})}>{result.assignment_course.course_name}</button>
                        </p>     
                    </div>
                }

                </div>
                );
                })}
            {props.searchResultsAssignments && props.searchResultsAssignments.length === 0 && <p>No matching assignments.</p>}
            <br></br>
            <h5>Courses:</h5>
            {props.searchResultsCourses && props.searchResultsCourses.length > 0 && props.searchResultsCourses.map((result, index) => {
                return(
                <li><button className='btn btn-link' onClick={() => navigateCourse(result)}>{result.course.course_name}</button></li>
                );
                })}
            
            {props.searchResultsCourses && props.searchResultsCourses.length ===0 && <p>No matching courses.</p>}

        </div>
    )   

}
export default SearchResults;