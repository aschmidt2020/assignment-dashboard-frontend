import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    search(searchTerm);
    setSearchTerm(""); //resets form
  }

  function search(searchTerm) {
    debugger
    let searchTermLower = searchTerm.toLowerCase();
    let searchResultsCourses = props.courses.filter(e => {
      if (e.course.course_name.toLowerCase().includes(searchTermLower)) { return true };
    })
    let searchResultsAssignments = props.assignments.filter(e => {
      if (e.assignment_name.toLowerCase().includes(searchTermLower)) { return true };
    })
    debugger
    props.getResults(searchResultsAssignments, searchResultsCourses);
    navigate('/search-results')
  }



  return (
    <form className="row" onSubmit={handleSubmit} style={{ "marginLeft": "10em", "width": "80%" }}>
      <div className="col-10" style={{ "marginRight": "-1em" }}>
        <input className="form-control" type="search" placeholder="Search" aria-label="Search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
      </div>

      <div className="col-2">
        <button type="submit" className="btn btn-primary" data-toggle="popover" title="Search" data-content="Search" trigger="hover"><i className="bi bi-search"></i></button>
      </div>
    </form>
  );
}

export default SearchBar;