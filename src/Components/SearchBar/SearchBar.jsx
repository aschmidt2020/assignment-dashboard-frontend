import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useStore } from '../../app/store';

const SearchBar = (props) => {
  const assignments = useStore((state) => state.assignments);
  const courses = useStore((state) => state.courses);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    search(searchTerm);
    setSearchTerm("");
  }

  function search(searchTerm) {
    let searchTermLower = searchTerm.toLowerCase();
    let searchResultsCourses = courses.filter(e => {
      if (e.course.course_name.toLowerCase().includes(searchTermLower)) { return true }
      else { return false };
    })
    let searchResultsAssignments = assignments.filter(e => {
      if (e.assignment_name.toLowerCase().includes(searchTermLower) && !e.assignment_archived) { return true }
      else { return false};
    })
    navigate('/search-results', {state: {searchResultsAssignments: searchResultsAssignments, searchResultsCourses: searchResultsCourses}})
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