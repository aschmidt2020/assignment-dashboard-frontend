import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

const EnrollButton = (props) => {
    const [allCourses, setAllCourses] = useState();
    const [currentCourseNames, setCurrentCourseNames] = useState();
    const { state } = useLocation();

    useEffect(() => {
        if (props.courses) {
            let course_names = props.courses.map((course, index) => { return course.course.course_name });
            setCurrentCourseNames(course_names);
            getAllCourses();
        }
        // eslint-disable-next-line
    }, [props.courses])

    async function getAllCourses() {
        const jwt = localStorage.getItem("token");
        await axios({
            method: "get",
            url: `assignment/getcourses/`,
            headers: {
                Authorization: "Bearer " + jwt
            },
        }).then(response => {
            setAllCourses(response.data);
        }).catch(error => {
            alert(error)
        })
    }

    async function addCourse(course_id) {
        if (props.userInfo.is_staff === true) {
            const jwt = localStorage.getItem("token");
            await axios({
                method: "post",
                url: `assignment/educator/addclass/`,
                headers: {
                    Authorization: "Bearer " + jwt
                },
                data: {
                    educator: props.educatorInfo.id,
                    course: course_id
                }
            }).then(response => {
                props.getEnrolledCourses();
            }).catch(error => {
                alert(error)
            })
        }
        else {
            const jwt = localStorage.getItem("token");
            await axios({
                method: "post",
                url: `assignment/student/registerclass/`,
                headers: {
                    Authorization: "Bearer " + jwt
                },
                data: {
                    student: props.studentInfo.id,
                    course: course_id
                }
            }).then(response => {
                props.getEnrolledCourses();
            }).catch(error => {
                alert(error)
            })
        }
    }

    async function removeCourse(course_id) {
        if (props.userInfo.is_staff === true) {
            const jwt = localStorage.getItem("token");
            await axios({
                method: "delete",
                url: `assignment/educator/removeclass/educator_id/${props.educatorInfo.id}/course_id/${course_id}/`,
                headers: {
                    Authorization: "Bearer " + jwt
                },
            }).then(response => {
                props.getEnrolledCourses();
            }).catch(error => {
                alert(error)
            })
        }
        else {
            const jwt = localStorage.getItem("token");
            await axios({
                method: "delete",
                url: `assignment/student/unregisterclass/student_id/${props.studentInfo.id}/course_id/${course_id}/`,
                headers: {
                    Authorization: "Bearer " + jwt
                },
            }).then(response => {
                props.getEnrolledCourses();
            }).catch(error => {
                alert(error)
            })
        }
    }

    return (
        <div>
            <h4>Course List: </h4>
            <ul>
                {allCourses && allCourses.map((course, index) => {
                    return (
                        <div>
                            <li>{course.course_name} &nbsp;&nbsp;&nbsp;
                                {currentCourseNames.indexOf(course.course_name) === -1 && <button className='btn btn-success  btn-sm' onClick={() => addCourse(course.id)}>Add Course</button>}
                                {currentCourseNames.indexOf(course.course_name) !== -1 && <button className='btn btn-danger  btn-sm' onClick={() => removeCourse(course.id)}>Remove Course</button>}
                            </li>
                            <br></br>
                        </div>
                    )
                }
                )}
            </ul>
        </div>
    );
}

export default EnrollButton;