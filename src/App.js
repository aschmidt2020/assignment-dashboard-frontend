import React, { useState, useEffect } from 'react';
import NavBar from './Components/NavBar/NavBar';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Routes, Route, useNavigate } from "react-router-dom";


function App() {
  const [user, setUser] = useState(undefined);
  const [userInfo, setUserInfo] = useState(undefined);
  const [staffInfo, setStaffInfo] = useState(undefined);
  const [studentInfo, setStudentInfo] = useState(undefined);

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
    if(userInfo != undefined){
      if(userInfo.is_staff===true){
        getEducatorInfo();
      }
      else{
        getStudentInfo();
      }
    }
    // eslint-disable-next-line
  }, [userInfo])

  // async function getAllCollections () {
  //   let response = await axios.get('http://127.0.0.1:8000/api/flashcard/allcollections/');
  //   setCollections(response.data)
  // }

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
    })
  }

  async function getStudentInfo() {
    const jwt = localStorage.getItem("token");
    await axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/assignment/student/${userInfo.id}/`,
      headers: {
        Authorization: "Bearer " + jwt
      },
    }).then(response => {
      setStudentInfo(response.data);
      setStaffInfo(undefined)
    })
  }

  async function getEducatorInfo() {
    const jwt = localStorage.getItem("token");
    await axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/assignment/educator/${userInfo.id}/`,
      headers: {
        Authorization: "Bearer " + jwt
      },
    }).then(response => {
      setStaffInfo(response.data);
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
    <div >
      <NavBar user={user} userInfo={userInfo} register={register} login={login} logout={logout}/>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
