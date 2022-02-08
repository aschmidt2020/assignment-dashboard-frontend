import React, { useState, useEffect } from 'react';

const Dashboard = (props) => {
    const [assignmentsNext3, setAssignmentsNext3] = useState();
    const [assignmentsNext7, setAssignmentsNext7] = useState();
    const [assignmentsLater, setAssignmentsLater] = useState();

    useEffect(() => {
        if(props.assignments != undefined){
            let assignments3 = [];
            let assignments7 = [];
            let assignments = [];
            let threeDays = new Date();
            threeDays.setDate(threeDays.getDate() + 3);
    
            let sevenDays = new Date();
            sevenDays.setDate(sevenDays.getDate() + 7)

            for (let i=0; i < props.assignments.length; i++) {
                let assignment_date = new Date(props.assignments[i].assignment.assignment_due_date + "T00:00:00");
                debugger
                if(assignment_date <= threeDays){
                    assignments3.push(props.assignments[i])
                }
                else if(assignment_date > threeDays && assignment_date <= sevenDays){
                    assignments7.push(props.assignments[i])
                }
                else{
                    assignments.push(props.assignments[i])
                }
              }
            
              setAssignmentsNext3(assignments3);
              setAssignmentsNext7(assignments7);
              setAssignmentsLater(assignments)
            }
        
        
      // eslint-disable-next-line
    }, [props.assignments])

    

    return ( 
        <div>
            <h1>Due Next 3 Days:</h1>
        <ul>
        {assignmentsNext3 && assignmentsNext3.map((assignment, index) => {
                    return (
                        <li key={assignment.assignment.id}>
                            <div className='row'>
                                <div className='col'>
                                    <h5>{assignment.assignment.assignment_name}</h5>
                                    <p><small>{assignment.assignment.assignment_desc}</small></p>
                                    <p>{assignment.assignment.assignment_instructions}</p>
                                </div>
                                <div className='col'>
                                    <p><small>{assignment.course.course_name}</small></p>
                                    <p>{assignment.assignment.assignment_due_date}</p>
                                </div>
                            </div>
                        </li>
                    )
  
            }
            )}
        </ul>


            <h1>Due in Next 7 days:</h1>
        <ul>
        {assignmentsNext7 && assignmentsNext7.map((assignment, index) => {
                    return (
                        <li key={assignment.assignment.id}>
                            <div className='row'>
                                <div className='col'>
                                    <h5>{assignment.assignment.assignment_name}</h5>
                                    <p><small>{assignment.assignment.assignment_desc}</small></p>
                                    <p>{assignment.assignment.assignment_instructions}</p>
                                </div>
                                <div className='col'>
                                    <p><small>{assignment.course.course_name}</small></p>
                                    <p>{assignment.assignment.assignment_due_date}</p>
                                </div>
                            </div>
                        </li>
                    )
  
            }
            )}
        </ul>

            <h1>Due more than 1 week from now:</h1>
        <ul>
            {assignmentsLater && assignmentsLater.map((assignment, index) => {
                    return (
                        <li key={assignment.assignment.id}>
                        <div className='row'>
                            <div className='col'>
                                <h5>{assignment.assignment.assignment_name}</h5>
                                <p><small>{assignment.assignment.assignment_desc}</small></p>
                                <p>{assignment.assignment.assignment_instructions}</p>
                            </div>
                            <div className='col'>
                                <p><small>{assignment.course.course_name}</small></p>
                                <p>{assignment.assignment.assignment_due_date}</p>
                            </div>
                        </div>
                    </li>
                    )
  
            }
            )}
        </ul>
        </div>
     );
}
    

 
export default Dashboard;