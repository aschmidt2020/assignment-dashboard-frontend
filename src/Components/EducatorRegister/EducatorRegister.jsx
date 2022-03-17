import React from 'react';
import useForm from "../CustomHooks/useForm";
import axios from 'axios';

const EducatorRegister = (props) => {
    const { formValues, handleChange, handleSubmit } = useForm(registerEducator);

    async function registerEducator() {
        const jwt = localStorage.getItem("token");
        await axios({
            method: "post",
            url: `assignment/educator/register/`,
            headers: {
                Authorization: "Bearer " + jwt
            },
            data: {
                employee_id: formValues.employee_id
            }
        }).then(response => {
            props.getEducatorInfo(props.userInfo.id);
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
                    <span className="input-group-text">Please Add Employee ID:</span>
                    <input className="form-control" type="number" name="employee_id" value={formValues.employee_id} onChange={handleChange} required={true}></input>
                </div>
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
        </div>
    );
}

export default EducatorRegister; 