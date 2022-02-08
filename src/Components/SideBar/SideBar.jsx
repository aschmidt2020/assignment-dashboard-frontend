import React, { useEffect, useState } from 'react';
import { Link, useNavigate} from "react-router-dom";

const SideBar = (props) => {
    const [url, setUrl] = useState('');

    const navigate = useNavigate();
    
    useEffect(() => {
        let current_window = window.location.href.split('/')
        setUrl(current_window[4])

        // eslint-disable-next-line
      }, [window.location.href])

    function navigateCourse(course) {
        debugger
        navigate(`/course/${course.course.course_name.split(' ').join('')}`, { state: {...course}});
    }

    return (
        <div>
            <nav className="d-flex flex-column flex-shrink-0 p-3 bg-white text-dark">
                <ul className="nav flex-column" id="nav_accordion">
                    <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Courses
                        </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <ul>
                        {props.courses && props.courses.map((course, index) => {
                            if(url.localeCompare(course.course.course_name.split(' ').join('')) === 0){
                                return (
                                    <li key={course.course.id} >
                                        <button className="btn btn-dark" onClick={() => navigateCourse(course)}>{course.course.course_name}</button>
                                    </li>
                                )
                            }
                            else {
                                return (
                                    <li key={course.course.id}>
                                        <button onClick={() => navigateCourse(course)}>{course.course.course_name}</button>
                                    </li>
                                )
                            }
                            
                        }
                            )}  
                        </ul>
                        
                        
                        </div>
                    </div>
                    </div>
                    <li className="nav-item">
                        {/* {props.userInfo && <span><Addcourse /></span>} */}
                    </li>
                </ul>
        </nav>
        </div>
    );
}

export default SideBar;