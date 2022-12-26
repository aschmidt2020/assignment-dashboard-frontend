import create from "zustand";
import axios from "axios";
import Axios from "axios";
import swal from 'sweetalert';
import jwt_decode from "jwt-decode";

//https://www.npmjs.com/package/zustand

const token = localStorage.getItem('token');
Axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

export const useStore = create((set, get) => ({
  user: null,
  userInfo: null,
  userIsStaff: null,
  studentInfo: null,
  educatorInfo: null,
  courses: [],
  assignments: [],
  studentAssignmentStatus: [],
  getAssignmentsStatus: async(id, is_staff) => {
    let statusURL = is_staff ? `/assignment/educator/getassignmentstatus/educator_id/${id}/` : `/assignment/student/getassignmentstatus/student_id/${id}/`
    await axios({
      method: "get",
      url: statusURL,
      headers: {
        Authorization: "Bearer " + token
      },
    }).then(response => {
      set({studentAssignmentStatus: response.data});
    }).catch(error => {
      swal({
        title: "Oops something went wrong!",
        text: error.message,
        icon: "error"
      })
    })
  },
  getAssignments: async(id, is_staff) => {
    let assignmentsURL = is_staff ? `/assignment/educator/getassignments/educator_id/${id}/` : `/assignment/student/getassignments/student_id/${id}/`
    await axios({
    method: "get",
    url: assignmentsURL,
    headers: {
        Authorization: "Bearer " + token
    },
    }).then(response => {
        set({assignments: response.data});
        get().getAssignmentsStatus(id, is_staff);
    }).catch(error => {
        swal({
            title: "Oops something went wrong!",
            text: error.message,
            icon: "error"
        })
    })
  },
  getEnrolledCourses: async(id, is_staff) => {
    let coursesURL = is_staff ? `assignment/educator/getcourses/educator_id/${id}/` : `/assignment/student/getcourses/student_id/${id}/`
    await axios({
        method: 'get',
        url: coursesURL,
        headers: {
            Authorization: "Bearer " + token
          },
    }).then(response => {
        set({courses: response.data});
        get().getAssignments(id, is_staff);
    }).catch(error => {
        swal({
            title: "Oops something went wrong!",
            text: error.message,
            icon: "error"
          })
    })
  },
  getUserInfo: async(user_id) => {
    await axios({
        method: "get",
        url: `/assignment/user/user_id/${user_id}/`,
        headers: {
          Authorization: "Bearer " + token
        },
      }).then(response => {
        set({userInfo: response.data})
      })
  },
  login: async(username, password) => {
    await axios({
        method: "post",
        url: "/auth/login/",
        headers: {},
        data: {
          "username": username,
          "password": password
        }
      }).then(response => {
        localStorage.setItem("token", response.data.access);
        localStorage.setItem("user_is_staff", response.data.is_staff)
        window.location = '/'
      }
      ).catch(error => {
        swal({
          title: "Oops something went wrong!",
          text: error.message,
          icon: "error"
        })
      })
  },
  register: async(userInfo) => {
    await axios({
        method: "post",
        url: "/auth/register/",
        headers: {},
        data: userInfo
      }).then(response => {
        get().login(userInfo.username, userInfo.password)
      }
      ).catch(error => {
        swal({
          title: "Oops something went wrong!",
          text: error.message,
          icon: "error"
        })
      })
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_is_staff")
    window.location = "/";
    set({}, true)
  }
}));