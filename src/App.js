import React, { useState, useEffect } from 'react';
import NavBar from './Components/NavBar/NavBar';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from './Components/Dashboard/Dashboard';
import SideBar from './Components/SideBar/SideBar';
import CourseViewer from './Components/CourseViewer/CourseViewer';
import EnrollButton from './Components/EnrollButton/EnrollButton';
import './App.css'
import StudentRegister from './Components/StudentRegister/StudentRegister';
import EducatorRegister from './Components/EducatorRegister/EducatorRegister';
import DisplayArchived from './Components/DisplayArchived/DisplayArchived';
import SubmitAssignment from './Components/SubmitAssignment/SubmitAssignment';
import SearchResults from './Components/SearchResults/SearchResults';

function App() {
  const navigate = useNavigate();
  // const API_KEY = process.env.REACT_APP_API_KEY_GO_FILE;
  const [user, setUser] = useState();
  const [userInfo, setUserInfo] = useState();
  const [educatorInfo, setEducatorInfo] = useState();
  const [studentInfo, setStudentInfo] = useState();
  const [courses, setCourses] = useState();
  const [assignments, setAssignments] = useState();
  const [studentAssignmentStatus, setStudentAssignmentStatus] = useState();
  const [searchResultsAssignments, setSearchResultsAssignments] = useState([]);
  const [searchResultsCourses, setSearchResultsCourses] = useState([])


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

  function getResults (assignments, courses){
    setSearchResultsAssignments(assignments);
    setSearchResultsCourses(courses)
  }

  async function getEnrolledCourses () {
    if(studentInfo !== undefined){
      const jwt = localStorage.getItem("token");
      await axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/assignment/student/getcourses/student_id/${studentInfo.id}/`,
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
    else if(educatorInfo !== undefined){
      const jwt = localStorage.getItem("token");
      await axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/assignment/educator/getcourses/educator_id/${educatorInfo.id}/`,
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
    if(studentInfo !== undefined){
      const jwt = localStorage.getItem("token");
      await axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/assignment/student/getassignments/student_id/${studentInfo.id}/`,
        headers: {
          Authorization: "Bearer " + jwt
        },
      }).then(response => {
        setAssignments(response.data);
        getAssignmentsStatus();

      }).catch(error => {
        alert(error)
      })
    }
    else if(educatorInfo !== undefined){
      const jwt = localStorage.getItem("token");
      await axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/assignment/educator/getassignments/educator_id/${educatorInfo.id}/`,
        headers: {
          Authorization: "Bearer " + jwt
        },
      }).then(response => {
        setAssignments(response.data);
        getAssignmentsStatus();
      }).catch(error => {
        alert(error)
      })
    }
  }

  async function getAssignmentsStatus () {
    if(studentInfo !== undefined){
      const jwt = localStorage.getItem("token");
      await axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/assignment/student/getassignmentstatus/student_id/${studentInfo.id}/`,
        headers: {
          Authorization: "Bearer " + jwt
        },
      }).then(response => {
        setStudentAssignmentStatus(response.data);
      }).catch(error => {
        alert(error)
      })
    }
    else if(educatorInfo !== undefined){
      const jwt = localStorage.getItem("token");
      await axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/assignment/educator/getassignmentstatus/`,
        headers: {
          Authorization: "Bearer " + jwt
        },
      }).then(response => {
        setStudentAssignmentStatus(response.data);
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
      url: `http://127.0.0.1:8000/api/assignment/user/user_id/${user.user_id}/`,
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
      url: `http://127.0.0.1:8000/api/assignment/student/user_id/${user_id}/`,
      headers: {
        Authorization: "Bearer " + jwt
      },
    }).then(response => {
      setStudentInfo(response.data);
      setEducatorInfo(undefined)
    }).catch(error => {
      navigate(`/complete-registration-student`, { state: {...userInfo}});
    })
  }

  async function getEducatorInfo(user_id) {
    const jwt = localStorage.getItem("token");
    await axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/assignment/educator/user_id/${user_id}/`,
      headers: {
        Authorization: "Bearer " + jwt
      },
    }).then(response => {
      setEducatorInfo(response.data);
      setStudentInfo(undefined)
    }).catch(error => {
      navigate(`/complete-registration-educator`, { state: {...userInfo}});
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
    <div className='container-fluid'>
      <div className='row'>
          <NavBar user={user} userInfo={userInfo} register={register} login={login} logout={logout} courses={courses} getAssignments={getAssignments} assignments={assignments} courses={courses} getResults={getResults}/>
          <div className='col-2 sidebar-border' style={{'height':'90vh'}} >
            <SideBar userInfo={userInfo} courses={courses}/>
          </div>

          <div className='col-6'>
            <Routes>
              <Route exact path='/' element={<Dashboard user={user} userInfo={userInfo} studentInfo={studentInfo} educatorInfo={educatorInfo} getAssignments={getAssignments} courses={courses} assignments={assignments} studentAssignmentStatus={studentAssignmentStatus}/>}/>
              <Route path='/course/:courseName' element={<CourseViewer userInfo={userInfo} educatorInfo={educatorInfo} getAssignments={getAssignments}/>}/>
              <Route path='/course/enroll' element={<EnrollButton userInfo={userInfo} educatorInfo={educatorInfo} studentInfo={studentInfo} courses={courses} getEnrolledCourses={getEnrolledCourses}/>}/>
              <Route path='/complete-registration-student' element={<StudentRegister userInfo={userInfo} getStudentInfo={getStudentInfo}/>}/>
              <Route path='/complete-registration-educator' element={<EducatorRegister userInfo={userInfo} getEducatorInfo={getEducatorInfo}/>}/>
              <Route path='/assignments/archived' element={<DisplayArchived assignments={assignments}/>}/>
              <Route path='/assignment/submit' element={<SubmitAssignment userInfo={userInfo}/>}/>
              <Route path='/search-results' element={<SearchResults userInfo={userInfo} searchResultsAssignments={searchResultsAssignments} searchResultsCourses={searchResultsCourses}/>}/>
            </Routes>
          </div>

          <div className='col-4'>
            view pane
          </div>
        </div>
    </div>
  );


}

export default App;