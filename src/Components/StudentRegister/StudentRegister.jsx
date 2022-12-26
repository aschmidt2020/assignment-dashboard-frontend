import React from 'react';
import useForm from "../CustomHooks/useForm";
import axios from 'axios';
import { useStore } from '../../app/store';

const StudentRegister = (props) => {
    const { formValues, handleChange, handleSubmit } = useForm(registerStudent);
    const userInfo = useStore((state) => state.userInfo);

    async function registerStudent() {
        const token = localStorage.getItem("token");
        await axios({
            method: "post",
            url: `assignment/student/register/`,
            headers: {
                Authorization: "Bearer " + token
            },
            data: {
                school_id: formValues.student_id
            }
        }).then(response => {
            props.getStudentInfo(userInfo.id);
            window.location = "/";
        }).catch(error => {
            alert(error)
        })
    }

    return (
        <div>
            <h5>Welcome {userInfo.username}! Please complete your registration.</h5>

            <div className="input-group mb-3">
                <span className="input-group-text">Username</span>
                <input className="form-control" type="text" name="assignment_name" value={userInfo.username} onChange={handleChange} aria-label="Disabled input example" disabled></input>
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text">First Name</span>
                <input className="form-control" type="text" name="assignment_name" value={userInfo.first_name} onChange={handleChange} aria-label="Disabled input example" disabled></input>
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text">Last Name</span>
                <input className="form-control" type="text" name="assignment_name" value={userInfo.last_name} onChange={handleChange} aria-label="Disabled input example" disabled></input>
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