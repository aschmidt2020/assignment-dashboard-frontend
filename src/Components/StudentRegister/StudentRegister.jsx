import React from 'react';
import useForm from "../CustomHooks/useForm";
import axios from 'axios';

const StudentRegister = (props) => {
    const { formValues, handleChange, handleSubmit } = useForm(registerStudent);

    async function registerStudent() {
        const jwt = localStorage.getItem("token");
        await axios({
            method: "post",
            url: `http://127.0.0.1:8000/api/assignment/student/register/`,
            headers: {
                Authorization: "Bearer " + jwt
            },
            data: {
                school_id: formValues.student_id
            }
        }).then(response => {
            props.getStudentInfo(props.userInfo.id);
            window.location = "/";
        }).catch(error => {
            alert(error)
        })
    }

    return (
        <div>
            <h5>Welcome {props.userInfo.username}! Please complete your registration.</h5>

            <div className="input-group mb-3">
                <span className="input-group-text">Username</span>
                <input className="form-control" type="text" name="assignment_name" value={props.userInfo.username} onChange={handleChange} aria-label="Disabled input example" disabled></input>
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text">First Name</span>
                <input className="form-control" type="text" name="assignment_name" value={props.userInfo.first_name} onChange={handleChange} aria-label="Disabled input example" disabled></input>
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text">Last Name</span>
                <input className="form-control" type="text" name="assignment_name" value={props.userInfo.last_name} onChange={handleChange} aria-label="Disabled input example" disabled></input>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <span className="input-group-text">Please Add Student ID:</span>
                    <input className="form-control" type="number" name="student_id" value={formValues.student_id} onChange={handleChange} required={true}></input>
                </div>
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
        </div>
    );
}

export default StudentRegister; 