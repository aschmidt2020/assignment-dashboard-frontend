import React, { useState, useEffect } from 'react';
import NavBar from './Components/NavBar/NavBar';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from './Components/Dashboard/Dashboard';
import SideBar from './Components/SideBar/SideBar';
import CourseViewer from './Components/CourseViewer/CourseViewer';
import EnrollButton from './Components/EnrollButton/EnrollButton';

function App() {
  const [user, setUser] = useState();
  const [userInfo, setUserInfo] = useState();
  const [educatorInfo, setEducatorInfo] = useState();
  const [studentInfo, setStudentInfo] = useState();
  const [courses, setCourses] = useState();
  const [assignments, setAssignments] = useState();

  useEffect(() => {
    //getAllCollections();
    const tokenFromStorage = localStorage.getItem("token");
    try {
      const decodedUser = jwt_decode(tokenFromStorage);
      setUser(decodedUser);
      getUserInfo(decodedUser, tokenFromStorage);
    } catch { }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    getEnrolledCourses();
    // eslint-disable-next-line
  }, [studentInfo, educatorInfo])

  async function getEnrolledCourses () {
    if(studentInfo != undefined){
      const jwt = localStorage.getItem("token");
      await axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/assignment/student/getcourses/${studentInfo.id}/`,
        headers: {
          Authorization: "Bearer " + jwt
        },
      }).then(response => {
        setCourses(response.data);
        getAssignments();
      }).catch(error => {
        alert(error)
      })
    }
    else if(educatorInfo != undefined){
      const jwt = localStorage.getItem("token");
      await axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/assignment/educator/getcourses/${educatorInfo.id}/`,
        headers: {
          Authorization: "Bearer " + jwt
        },
      }).then(response => {
        setCourses(response.data);
        getAssignments();
      }).catch(error => {
        alert(error)
      })
    }
  }

  async function getAssignments () {
    if(studentInfo != undefined){
      const jwt = localStorage.getItem("token");
      await axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/assignment/student/getassignemnts/${studentInfo.id}/`,
        headers: {
          Authorization: "Bearer " + jwt
        },
      }).then(response => {
        setAssignments(response.data);
      }).catch(error => {
        alert(error)
      })
    }
    else if(educatorInfo != undefined){
      const jwt = localStorage.getItem("token");
      await axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/assignment/educator/getassignments/${educatorInfo.id}/`,
        headers: {
          Authorization: "Bearer " + jwt
        },
      }).then(response => {
        setAssignments(response.data);
      }).catch(error => {
        alert(error)
      })
    }
  }

  async function login(username, password) {
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/auth/login/",
      headers: {},
      data: {
        "username": username,
        "password": password
      }
    }).then(response => {
      localStorage.setItem("token", response.data.access);
      window.location = "/";
    }
    ).catch(error => {
      alert(error)
    })
  }

  async function getUserInfo(user, token) {
    await axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/assignment/user/${user.user_id}/`,
      headers: {
        Authorization: "Bearer " + token
      },
    }).then(response => {
      setUserInfo(response.data);
      if(response.data.is_staff ===true){
        getEducatorInfo(response.data.id);
      }
      else{
        getStudentInfo(response.data.id);
      }
    })
  }

  async function getStudentInfo(user_id) {
    const jwt = localStorage.getItem("token");
    await axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/assignment/student/${user_id}/`,
      headers: {
        Authorization: "Bearer " + jwt
      },
    }).then(response => {
      setStudentInfo(response.data);
      setEducatorInfo(undefined)
    })
  }

  async function getEducatorInfo(user_id) {
    const jwt = localStorage.getItem("token");
    await axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/assignment/educator/${user_id}/`,
      headers: {
        Authorization: "Bearer " + jwt
      },
    }).then(response => {
      setEducatorInfo(response.data);
      setStudentInfo(undefined)
    })
  }

  async function logout() {
    localStorage.removeItem("token");
    window.location = "/";
  }

  async function register(userInfo) {
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/auth/register/",
      headers: {},
      data: userInfo
    }).then(response => {
      login(userInfo.username, userInfo.password)
    }
    ).catch(error => {
      alert(error)
    })

  }
  return (

    <div className='row'>
        <NavBar user={user} userInfo={userInfo} register={register} login={login} logout={logout} courses={courses} getAssignments={getAssignments}/>
        <div className='col-2'>
          <SideBar userInfo={userInfo} courses={courses}/>
        </div>

        <div className='col-10'>
          <Routes>
            <Route exact path='/' element={<Dashboard courses={courses} assignments={assignments}/>}/>
            <Route path='/course/:courseName' element={<CourseViewer />}/>
            <Route path='/course/enroll' element={<EnrollButton userInfo={userInfo} educatorInfo={educatorInfo} studentInfo={studentInfo} courses={courses} getEnrolledCourses={getEnrolledCourses}/>}/>
          </Routes>
        </div>
      </div>

  );
}

export default App;
