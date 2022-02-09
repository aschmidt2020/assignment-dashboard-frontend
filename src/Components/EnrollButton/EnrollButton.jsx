import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

const EnrollButton = (props) => {
    const [allCourses, setAllCourses] = useState();
    const [currentCourseNames, setCurrentCourseNames] = useState();
    const {state} = useLocation();

    useEffect(() => {
        if(props.courses){
            let course_names = props.courses.map((course, index) => {return course.course.course_name});
            setCurrentCourseNames(course_names);
            getAllCourses();
        }
        // eslint-disable-next-line
      }, [props.courses])
    
    async function getAllCourses(){
    const jwt = localStorage.getItem("token");
    await axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/assignment/getcourses/`,
        headers: {
        Authorization: "Bearer " + jwt
        },
    }).then(response => {
        setAllCourses(response.data);
    }).catch(error => {
        alert(error)
    })
    }

    async function addCourse(course_id){
        debugger
        if(props.userInfo.is_staff === true){
            const jwt = localStorage.getItem("token");
            await axios({
                method: "post",
                url: `http://127.0.0.1:8000/api/assignment/educator/addclass/`,
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
        else{
            const jwt = localStorage.getItem("token");
            await axios({
                method: "post",
                url: `http://127.0.0.1:8000/api/assignment/student/registerclass/`,
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

        async function removeCourse(course_id){
            debugger
            if(props.userInfo.is_staff === true){
                const jwt = localStorage.getItem("token");
                await axios({
                    method: "delete",
                    url: `http://127.0.0.1:8000/api/assignment/educator/removeclass/educator_id/${props.educatorInfo.id}/course_id/${course_id}/`,
                    headers: {
                        Authorization: "Bearer " + jwt
                    },
                }).then(response => {
                    props.getEnrolledCourses();
                }).catch(error => {
                    alert(error)
                })
                    }
            else{
                const jwt = localStorage.getItem("token");
                await axios({
                    method: "delete",
                    url: `http://127.0.0.1:8000/api/assignment/student/unregisterclass/student_id/${props.studentInfo.id}/course_id/${course_id}/`,
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
            <ul>
                 {allCourses && allCourses.map((course, index) => {
                    return(
                        <div>
                            <li>{course.course_name}</li>
                            {currentCourseNames.indexOf(course.course_name) === -1 && <button onClick={() => addCourse(course.id)}>Add Course</button>}
                            {currentCourseNames.indexOf(course.course_name) !== -1 && <button onClick={() => removeCourse(course.id)}>Remove Course</button>}
                        </div>
                    )
                    }
                )}  
            </ul>
         );
    }
 
export default EnrollButton;