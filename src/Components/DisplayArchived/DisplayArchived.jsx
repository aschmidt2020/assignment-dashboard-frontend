import React, { useEffect, useState } from 'react';
import { useStore } from '../../app/store';

const DisplayArchived = (props) => {
  const assignments = useStore((state) => state.assignments)
  const [archivedAssignments, setArchivedAssignments] = useState([]);

  useEffect(() => {
    if(assignments) {
      let assignmentsArchived = assignments.filter(assignment => assignment.assignment_archived ? true : false)
      setArchivedAssignments(assignmentsArchived)
    }
    // eslint-disable-next-line
  }, [assignments])

  return (
    <table className='table course-table'>
      <thead>
        <tr>
          <th>Assignment</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody>
        {archivedAssignments && archivedAssignments.length > 0 && archivedAssignments.map((assignment, index) => {
          return ( //parenthesis because you are returning multiple lines of code
            <tr key={assignment.id}>
              <td>{assignment.assignment_name} {assignment.assignment_link && <a href={assignment.assignment_link}  target = "_blank" rel="noreferrer"><i className="bi bi-paperclip"></i></a>}</td>
              <td>{assignment.assignment_due_date}</td>
            </tr>
          )
        })}
        {(archivedAssignments && archivedAssignments.length===0) && <tr style={{'color':'black'}}><td>No assignments!</td></tr>}
      </tbody>
    </table>

  );
}

export default DisplayArchived;