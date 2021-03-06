import React, { useState, useEffect } from 'react';
import NavBar from './Components/NavBar/NavBar';
import axios from "axios";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import { Routes, Route, useNavigate } from "react-router-dom";
import StudentDashboard from './Components/StudentDashboard/StudentDashboard';
import SideBar from './Components/SideBar/SideBar';
import CourseViewer from './Components/CourseViewer/CourseViewer';
import EnrollButton from './Components/EnrollButton/EnrollButton';
import './App.css'
import StudentRegister from './Components/StudentRegister/StudentRegister';
import EducatorRegister from './Components/EducatorRegister/EducatorRegister';
import DisplayArchived from './Components/DisplayArchived/DisplayArchived';
import SearchResults from './Components/SearchResults/SearchResults';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import Notepad from './Components/Notepad/Notepad';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import EducatorDashboard from './Components/EducatorDashboard/EducatorDashboard';
import swal from 'sweetalert';
import LandingPage from './Components/LandingPage/LandingPage';

function App() {
  Axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [userInfo, setUserInfo] = useState();
  const [educatorInfo, setEducatorInfo] = useState();
  const [studentInfo, setStudentInfo] = useState();
  const [courses, setCourses] = useState();
  const [assignments, setAssignments] = useState();
  const [studentAssignmentStatus, setStudentAssignmentStatus] = useState();
  const [searchResultsAssignments, setSearchResultsAssignments] = useState([]);
  const [searchResultsCourses, setSearchResultsCourses] = useState([]);
  const [lightMode, setLightMode] = useState(true);

  const [width, setWidth] = useState(0);

  //needed to automatically re-render calendar
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [setWidth])

  useEffect(() => {
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

  useEffect(() => {
    try {
      var calendarEl = document.getElementById('calendar');
      let eventsList = [];

      if (assignments) {
        for (let i = 0; i < assignments.length; i++) {
          eventsList.push({
            id: i,
            start: assignments[i].assignment_due_date,
            end: assignments[i].assignment_due_date,
            title: assignments[i].assignment_name
          })
        }
      }

      var calendar = new Calendar(calendarEl, {
        height: '65%',
        aspectRatio: 1,
        fixedWeekCount: false,
        handleWindowResize: true,
        eventClick: function (info) {
          let dd = String(info.event.start.getDate()).padStart(2, '0');
          let mm = String(info.event.start.getMonth() + 1).padStart(2, '0'); //January is 0!
          let yyyy = String(info.event.start.getFullYear());
          swal({
            title: info.event.title,
            text: 'Due Date: ' + mm + '/' + dd + '/' + yyyy
          })
        },
        plugins: [dayGridPlugin, bootstrap5Plugin],
        themeSystem: 'bootstrap5',
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'today'

        },

        events: eventsList
      });

      calendar.render()
    }
    catch {
      console.log('Not logged in.')
    }
  }, [assignments, width]);

  function getResults(assignments, courses) {
    setSearchResultsAssignments(assignments);
    setSearchResultsCourses(courses)
  }

  async function getEnrolledCourses() {
    if (studentInfo !== undefined) {
      const jwt = localStorage.getItem("token");
      await axios({
        method: "get",
        url: `assignment/student/getcourses/student_id/${studentInfo.id}/`,
        headers: {
          Authorization: "Bearer " + jwt
        },
      }).then(response => {
        setCourses(response.data);
        getAssignments();
      }).catch(error => {
        swal({
          title: "Oops something went wrong!",
          text: error.message,
          icon: "error"
        })
      })
    }
    else if (educatorInfo !== undefined) {
      const jwt = localStorage.getItem("token");
      await axios({
        method: "get",
        url: `assignment/educator/getcourses/educator_id/${educatorInfo.id}/`,
        headers: {
          Authorization: "Bearer " + jwt
        },
      }).then(response => {
        setCourses(response.data);
        getAssignments();
      }).catch(error => {
        swal({
          title: "Oops something went wrong!",
          text: error.message,
          icon: "error"
        })
      })
    }
  }

  async function getAssignments() {
    if (studentInfo !== undefined) {
      const jwt = localStorage.getItem("token");
      await axios({
        method: "get",
        url: `assignment/student/getassignments/student_id/${studentInfo.id}/`,
        headers: {
          Authorization: "Bearer " + jwt
        },
      }).then(response => {
        setAssignments(response.data);
        getAssignmentsStatus();

      }).catch(error => {
        swal({
          title: "Oops something went wrong!",
          text: error.message,
          icon: "error"
        })
      })
    }
    else if (educatorInfo !== undefined) {
      const jwt = localStorage.getItem("token");
      await axios({
        method: "get",
        url: `assignment/educator/getassignments/educator_id/${educatorInfo.id}/`,
        headers: {
          Authorization: "Bearer " + jwt
        },
      }).then(response => {
        setAssignments(response.data);
        getAssignmentsStatus();
      }).catch(error => {
        swal({
          title: "Oops something went wrong!",
          text: error.message,
          icon: "error"
        })
      })
    }
  }

  async function getAssignmentsStatus() {
    if (studentInfo !== undefined) {
      const jwt = localStorage.getItem("token");
      await axios({
        method: "get",
        url: `assignment/student/getassignmentstatus/student_id/${studentInfo.id}/`,
        headers: {
          Authorization: "Bearer " + jwt
        },
      }).then(response => {
        setStudentAssignmentStatus(response.data);
      }).catch(error => {
        swal({
          title: "Oops something went wrong!",
          text: error.message,
          icon: "error"
        })
      })
    }
    else if (educatorInfo !== undefined) {
      const jwt = localStorage.getItem("token");
      await axios({
        method: "get",
        url: `assignment/educator/getassignmentstatus/`,
        headers: {
          Authorization: "Bearer " + jwt
        },
      }).then(response => {
        setStudentAssignmentStatus(response.data);
      }).catch(error => {
        swal({
          title: "Oops something went wrong!",
          text: error.message,
          icon: "error"
        })
      })
    }
  }

  async function login(username, password) {
    await axios({
      method: "post",
      url: "auth/login/",
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
      swal({
        title: "Oops something went wrong!",
        text: error.message,
        icon: "error"
      })
    })
  }

  async function getUserInfo(user, token) {
    await axios({
      method: "get",
      url: `assignment/user/user_id/${user.user_id}/`,
      headers: {
        Authorization: "Bearer " + token
      },
    }).then(response => {
      setUserInfo(response.data);
      if (response.data.is_staff === true) {
        getEducatorInfo(response.data.id);
      }
      else {
        getStudentInfo(response.data.id);
      }
    })
  }

  async function getStudentInfo(user_id) {
    const jwt = localStorage.getItem("token");
    await axios({
      method: "get",
      url: `assignment/student/user_id/${user_id}/`,
      headers: {
        Authorization: "Bearer " + jwt
      },
    }).then(response => {
      setStudentInfo(response.data);
      setEducatorInfo(undefined)
    }).catch(error => {
      navigate(`/complete-registration-student`, { state: { ...userInfo } });
    })
  }

  async function getEducatorInfo(user_id) {
    const jwt = localStorage.getItem("token");
    await axios({
      method: "get",
      url: `assignment/educator/user_id/${user_id}/`,
      headers: {
        Authorization: "Bearer " + jwt
      },
    }).then(response => {
      setEducatorInfo(response.data);
      setStudentInfo(undefined)
    }).catch(error => {
      navigate(`/complete-registration-educator`, { state: { ...userInfo } });
    })
  }

  async function logout() {
    localStorage.removeItem("token");
    window.location = "/";
  }

  async function register(userInfo) {
    await axios({
      method: "post",
      url: "auth/register/",
      headers: {},
      data: userInfo
    }).then(response => {
      login(userInfo.username, userInfo.password)
    }
    ).catch(error => {
      swal({
        title: "Oops something went wrong!",
        text: error.message,
        icon: "error"
      })
    })

  }

  if (userInfo) {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <NavBar user={user} userInfo={userInfo} register={register} login={login} logout={logout} courses={courses} getAssignments={getAssignments} assignments={assignments} getResults={getResults} />

          <div className='col-2 sidebar-border' style={{ 'height': '90vh', 'paddingTop': '2%' }} >
            <SideBar userInfo={userInfo} courses={courses} />
          </div>

          <div className='col-6' style={{ 'paddingTop': '2%' }}>
            <Routes>
              {userInfo && userInfo.is_staff === false && <Route exact path='/' element={<StudentDashboard user={user} userInfo={userInfo} studentInfo={studentInfo} educatorInfo={educatorInfo} getAssignments={getAssignments} courses={courses} assignments={assignments} studentAssignmentStatus={studentAssignmentStatus} getAssignmentsStatus={getAssignmentsStatus}/>} />}
              {userInfo && userInfo.is_staff === true && <Route exact path='/' element={<EducatorDashboard user={user} userInfo={userInfo} studentInfo={studentInfo} educatorInfo={educatorInfo} getAssignments={getAssignments} courses={courses} assignments={assignments} studentAssignmentStatus={studentAssignmentStatus} />} />}
              <Route path='/course/:courseName' element={<CourseViewer userInfo={userInfo} educatorInfo={educatorInfo} studentInfo={studentInfo} getAssignments={getAssignments} />} />
              <Route path='/course/enroll' element={<EnrollButton userInfo={userInfo} educatorInfo={educatorInfo} studentInfo={studentInfo} courses={courses} getEnrolledCourses={getEnrolledCourses} />} />
              <Route path='/complete-registration-student' element={<StudentRegister userInfo={userInfo} getStudentInfo={getStudentInfo} />} />
              <Route path='/complete-registration-educator' element={<EducatorRegister userInfo={userInfo} getEducatorInfo={getEducatorInfo} />} />
              <Route path='/assignments/archived' element={<DisplayArchived assignments={assignments} />} />
              <Route path='/search-results' element={<SearchResults userInfo={userInfo} searchResultsAssignments={searchResultsAssignments} searchResultsCourses={searchResultsCourses} />} />
            </Routes>
          </div>

          <div className='col-4' style={{ 'paddingLeft': '2%', 'paddingRight': '2%', 'paddingTop': '2%' }}>
            <div id='calendar'></div>
            <Notepad user={user} userInfo={userInfo} studentInfo={studentInfo} educatorInfo={educatorInfo} />
          </div>
        </div>
      </div>
    )
  }

  else {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <Routes>
            {userInfo === undefined && <Route exact path='/' element={<LandingPage register={register} login={login} />} />}
          </Routes>
        </div>
      </div>
    )
  }




}

export default App;