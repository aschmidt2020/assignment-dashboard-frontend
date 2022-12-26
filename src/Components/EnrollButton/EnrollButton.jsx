import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStore } from '../../app/store';

const EnrollButton = (props) => {
    const courses = useStore((state) => state.courses);
    const userInfo = useStore((state) => state.userInfo);
    const studentInfo = useStore((state) => state.studentInfo);
    const educatorInfo = useStore((state) => state.educatorInfo)
    const [allCourses, setAllCourses] = useState();
    const [currentCourseNames, setCurrentCourseNames] = useState();

    useEffect(() => {
        if (courses) {
            let course_names = courses.map((course, index) => { return course.course.course_name });
            setCurrentCourseNames(course_names);
            getAllCourses();
        }
        // eslint-disable-next-line
    }, [courses])

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
        if (userInfo.is_staff) {
            const jwt = localStorage.getItem("token");
            await axios({
                method: "post",
                url: `assignment/educator/addclass/`,
                headers: {
                    Authorization: "Bearer " + jwt
                },
                data: {
                    educator: educatorInfo.id,
                    course: course_id
                }
            }).then(response => {
                useStore.getState().getEnrolledCourses(educatorInfo.id, false)
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
                    student: studentInfo.id,
                    course: course_id
                }
            }).then(response => {
                useStore.getState().getEnrolledCourses(studentInfo.id, false)
            }).catch(error => {
                alert(error)
            })
        }
    }

    async function removeCourse(course_id) {
        if (userInfo.is_staff) {
            const jwt = localStorage.getItem("token");
            await axios({
                method: "delete",
                url: `assignment/educator/removeclass/educator_id/${educatorInfo.id}/course_id/${course_id}/`,
                headers: {
                    Authorization: "Bearer " + jwt
                },
            }).then(response => {
                useStore.getState().getEnrolledCourses(educatorInfo.id, true)
            }).catch(error => {
                alert(error)
            })
        }
        else {
            const jwt = localStorage.getItem("token");
            await axios({
                method: "delete",
                url: `assignment/student/unregisterclass/student_id/${studentInfo.id}/course_id/${course_id}/`,
                headers: {
                    Authorization: "Bearer " + jwt
                },
            }).then(response => {
                useStore.getState().getEnrolledCourses(studentInfo.id, false)
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
                        <div key={course.id}>
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