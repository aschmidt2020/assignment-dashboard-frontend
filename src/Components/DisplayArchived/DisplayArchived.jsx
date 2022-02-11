import React, { useEffect, useState } from 'react';

const DisplayArchived = (props) => {
    const [archivedAssignments, setArchivedAssignments] = useState();

    useEffect(() => {
        debugger
        if(props.assignments !== undefined){
            // let today = new Date();
            // today = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
            // let todayDate = new Date(today + "T00:00:00")

            let today = new Date();
            today.setDate(today.getDate() + 0);
            let assignments = [];
    
            for (let i=0; i < props.assignments.length; i++) {
                let archiveDate = new Date(props.assignments[i].assignment_due_date + "T00:00:00");
                archiveDate.setDate(archiveDate.getDate() + 3);
                if(archiveDate < today){
                    assignments.push(props.assignments[i])
                }
            }
            setArchivedAssignments(assignments)
        }
      // eslint-disable-next-line
    }, [props.assignments])

    return ( 
        <table className='table'>
        <thead>
          <tr>
            <th>Assignment</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {archivedAssignments && archivedAssignments.map((assignment, index) => {
            return ( //parenthesis because you are returning multiple lines of code
                <tr key={assignment.id}>
                  <td>{assignment.assignment_name}</td>
                  <td>{assignment.assignment_due_date}</td>
                </tr>
            )
          })}
        </tbody>
        </table>

     );
}
 
export default DisplayArchived;