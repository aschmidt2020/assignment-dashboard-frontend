import React, { useEffect, useState } from 'react';
import { Link, useNavigate} from "react-router-dom";
import EnrollButton from '../EnrollButton/EnrollButton';

const SideBar = (props) => {
    const [url, setUrl] = useState('');

    const navigate = useNavigate();
    
    useEffect(() => {
        let current_window = window.location.href.split('/')
        setUrl(current_window[4])

        // eslint-disable-next-line
      }, [window.location.href])

    function navigateCourse(course) {
        navigate(`/course/${course.course.course_name.split(' ').join('')}`, { state: {...course}});
    }

    function navigateEnroll(){
        navigate(`/course/enroll`);
    }

    function navigateArchived(){
        navigate(`/assignments/archived`);
    }

    return (
        <div>
            <nav className="d-flex flex-column flex-shrink-0 p-3">
                {props.userInfo && <span className="navbar-welcome-text">Welcome {props.userInfo.username}!</span>}
                {!props.userInfo && <span className="navbar-welcome-text">Please log-in.</span>}
                <ul className="nav flex-column" id="nav_accordion">
                    <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="true" aria-controls="flush-collapseOne">
                            Courses
                        </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <ul>
                        {props.courses && props.courses.map((course, index) => {
                            if(url && url.localeCompare(course.course.course_name.split(' ').join('')) === 0){
                                return (
                                    <li className="sidebar-course-list-active" key={course.course.id} >
                                        <button className="btn sidebar-course-button" style={{"textAlign": 'left'}} onClick={() => navigateCourse(course)}>
                                            {course.course.course_name}
                                        </button>
                                    </li>
                                )
                            }
                            else {
                                return (
                                    <li className="sidebar-course-list" key={course.course.id}>
                                        <button className="btn sidebar-course-button" style={{"textAlign": 'left'}} onClick={() => navigateCourse(course)}>{course.course.course_name}</button>
                                    </li>
                                )
                            }
                            
                        }
                            )}

                        
                        </ul>
                        
                        
                        </div>
                    </div>
                    </div>
                    
                    <div className='accordion accordion-flush'>

                    <div class="accordion-item" style={{'marginTop':'2em'}}>
                        <h2 class="accordion-header" id="headingFour">
                        <button onClick={navigateArchived} class="btn btn-link" type="button">
                            Archived Assignments
                        </button>
                        </h2>
                    </div>
                    </div>
                    <li className="nav-item bottom-button">
                        {props.userInfo && <span><button className="btn btn-outline-dark" style={{'marginLeft':'1em', 'marginRight':'1em'}} onClick={() => navigateEnroll()}> Add Course</button></span>}
                        <Link to="/" className="btn btn-outline-dark" data-toggle="popover" title="Home" data-content="Home" trigger="hover">&nbsp;&nbsp;&nbsp; Home &nbsp;&nbsp;&nbsp;</Link>
                    </li>
                </ul>
        </nav>
        </div>
    );
}

export default SideBar;