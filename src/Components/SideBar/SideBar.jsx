import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const SideBar = (props) => {
    const [url, setUrl] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        let current_window = window.location.href.split('/')
        setUrl(current_window[4])

        // eslint-disable-next-line
    }, [window.location.href])

    function navigateCourse(course) {
        navigate(`/course/${course.course.course_name.split(' ').join('')}`, { state: { ...course } });
    }

    function navigateArchived() {
        navigate(`/assignments/archived`);
    }

    return (
        <div>
            <nav className="d-flex flex-column flex-shrink-0 p-3">
                {props.userInfo && <h5 className="navbar-welcome-text" style={{ 'marginBottom': '0.5em' }}>Welcome {props.userInfo.first_name}!</h5>}
                {props.userInfo && props.userInfo.is_staff === false && <p className="navbar-welcome-text"><mark>Student Dashboard</mark></p>}
                {props.userInfo && props.userInfo.is_staff === true && <p className="navbar-welcome-text"><mark>Educator Dashboard</mark></p>}
                {!props.userInfo && <span className="navbar-welcome-text">Please log-in.</span>}
                <br></br>

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
                                        if (url && url.localeCompare(course.course.course_name.split(' ').join('')) === 0) {
                                            return (
                                                <li className="sidebar-course-list-active" key={course.course.id} >
                                                    <button className="btn sidebar-course-button" style={{ "textAlign": 'left' }} onClick={() => navigateCourse(course)}>
                                                        {course.course.course_name}
                                                    </button>
                                                </li>
                                            )
                                        }
                                        else {
                                            return (
                                                <li className="sidebar-course-list" key={course.course.id}>
                                                    <button className="btn sidebar-course-button" style={{ "textAlign": 'left' }} onClick={() => navigateCourse(course)}>{course.course.course_name}</button>
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

                        <div className="accordion-item" style={{ 'marginTop': '2em' }}>
                            <h2 className="accordion-header" id="headingFour">
                                <button onClick={navigateArchived} className="btn btn-link" type="button">
                                    Archived Assignments
                                </button>
                            </h2>
                        </div>
                    </div>
                    <li className="nav-item bottom-button">
                        <Link to="/" className="btn btn-outline-secondary" data-toggle="popover" title="Home" data-content="Home" trigger="hover">&nbsp;&nbsp;&nbsp; Home &nbsp;&nbsp;&nbsp;</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default SideBar;