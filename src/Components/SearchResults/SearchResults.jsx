import React from 'react';

const SearchResults = (props) => {

    return ( 
        <div>
            {props.searchResultsAssignments && props.searchResultsAssignments.length > 0 && props.searchResultsAssignments.map((result, index) => {
                return(
                <p>Assignment: {result.assignment_name}</p>
                );
                })}

            {props.searchResultsCourses && props.searchResultsCourses.length > 0 && props.searchResultsCourses.map((result, index) => {
                return(
                <p>Course: {result.course.course_name}</p>
                );
                })}
            
            {props.searchResultsAssignments.length ===0 && props.searchResultsCourses.length ===0 && <p>No results!</p>}
        </div>
    )   

}
export default SearchResults;