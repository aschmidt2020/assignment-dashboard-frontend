import React, { useState, useEffect } from 'react';
import NavBar from './Components/NavBar/NavBar';
import axios from 'axios';
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
import { useStore } from './app/store';

function App() {
  Axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
  const navigate = useNavigate();
  const store = useStore();
  const userInfo = useStore((state) => state.userInfo);
  const assignments = useStore((state) => state.assignments);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    const userIsStaff = localStorage.getItem("user_is_staff");
    try {
      const decodedUser = jwt_decode(tokenFromStorage);
      useStore.setState({user: decodedUser.user_id, userIsStaff: userIsStaff});
      useStore.getState().getUserInfo(decodedUser.user_id);
      if(userIsStaff === "true"){
        getEducatorInfo(decodedUser.user_id, tokenFromStorage)
      } else {
        getStudentInfo(decodedUser.user_id, tokenFromStorage)
      }
    } catch (e) { 
      console.log(e)
    }
    // eslint-disable-next-line
  }, [])

  //needed to automatically re-render calendar
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [setWidth])

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
    catch { }
  }, [assignments, width]);

  async function getEducatorInfo(user_id, token){
    await axios({
        method: "get",
        url: `/assignment/educator/user_id/${user_id}/`,
        headers: {
          Authorization: "Bearer " + token
        },
      }).then(response => {
        if(response.status === 200){
            useStore.setState({studentInfo: null, educatorInfo: response.data});
            useStore.getState().getEnrolledCourses(response.data.id, true);
            return true
        } else {
            navigate('/complete-registration-educator')
        }
      }).catch(error => {
        swal({
            title: "Oops something went wrong!",
            text: error.message,
            icon: "error"
          })
      })
    
  }

  async function getStudentInfo(user_id, token){
    await axios({
        method: "get",
        url: `/assignment/student/user_id/${user_id}/`,
        headers: {
          Authorization: "Bearer " + token
        },
      }).then(response => {
        if(response.status === 200){
          useStore.setState({studentInfo: response.data, educatorInfo: null});
          useStore.getState().getEnrolledCourses(response.data.id, false);
          return true
        } else {
            navigate('/complete-registration-student')
        }
      })

  }

  if (userInfo) {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <NavBar />

          <div className='col-2 sidebar-border' style={{ 'height': '90vh', 'paddingTop': '2%' }} >
            <SideBar />
          </div>

          <div className='col-6' style={{ 'paddingTop': '2%' }}>
            <Routes>
              {userInfo && !userInfo.is_staff && <Route exact path='/' element={<StudentDashboard />} />}
              {userInfo && userInfo.is_staff && <Route exact path='/' element={<EducatorDashboard />} />}
              <Route path='/course/:courseName' element={<CourseViewer />} />
              <Route path='/course/enroll' element={<EnrollButton />} />
              <Route path='/complete-registration-student' element={<StudentRegister getStudentInfo={getStudentInfo}/>} />
              <Route path='/complete-registration-educator' element={<EducatorRegister getEducatorInfo={getEducatorInfo}/>} />
              <Route path='/assignments/archived' element={<DisplayArchived />} />
              <Route path='/search-results' element={<SearchResults />} />
            </Routes>
          </div>

          <div className='col-4' style={{ 'paddingLeft': '2%', 'paddingRight': '2%', 'paddingTop': '2%' }}>
            <div id='calendar'></div>
            <Notepad />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <Routes>
            <Route exact path='/' element={<LandingPage />} />
          </Routes>
        </div>
      </div>
    )
  }




}

export default App;