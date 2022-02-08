import React, { useState } from 'react';
import useForm from "../CustomHooks/useForm";

const StudentRegister = (props) => {
    const { formValues, handleChange, handleSubmit } = useForm(register);
    
    return (
        <div>
            <input className="form-control" type="text" placeholder={props.username} aria-label="Disabled input example" disabled></input>
            <input className="form-control" type="text" placeholder={props.first_name} aria-label="Disabled input example" disabled></input>
            <input className="form-control" type="text" placeholder={props.last_name} aria-label="Disabled input example" disabled></input>
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                <span className="input-group-text">Please Add Student ID:</span>
                <input className="form-control is-invalid" type="text" name="studentId" value={formValues.school_id} onChange={handleChange} required={true}></input>
                </div>
            </form>
        </div>
    );
}
 
export default StudentRegister;props  