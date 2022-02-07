import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useForm from "../CustomHooks/useForm";

const RegistrationForm = (props) => {

  const { formValues, handleChange, handleSubmit } = useForm(register);
  const [show, setShow] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [staff, setStaff] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  function register() {
    debugger
    if (formValues.password === formValues.passwordCheck) {
        if(staff === false){
            let userInfo = {...formValues, "is_staff": 0}
            props.register(userInfo);
        }
        else{
            let userInfo = {...formValues, "is_staff": 1}
            props.register(userInfo);
        }
      debugger
      setPasswordError(false);
    }
    else {
      alert("Passwords must match.");
      setPasswordError(true);
    }

  }

  return (
    <span id="sign-up">
      <Button variant="btn btn-outline-dark" onClick={handleShow} style={{ "marginLeft": "1em" }}>
        Register
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <span className="input-group-text">First name</span>
              <input className="form-control" type="text" name="first_name" value={formValues.first_name} onChange={handleChange} required={true}></input>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">Last name</span>
              <input className="form-control" type="text" name="last_name" value={formValues.last_name} onChange={handleChange} required={true}></input>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">Email</span>
              <input className="form-control" type="email" name="email" value={formValues.email} onChange={handleChange} required={true}></input>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">Username</span>
              <input className="form-control" type="text" name="username" value={formValues.username} onChange={handleChange} required={true}></input>
            </div>

            {!passwordError &&
              <div className="input-group mb-3">
                <span className="input-group-text">Password</span>
                <input className="form-control" type="password" name="password" value={formValues.password} onChange={handleChange} required={true}></input>
              </div>
            }
            {passwordError &&
              <div className="input-group mb-3">
                <span className="input-group-text">Password</span>
                <input className="form-control is-invalid" type="password" name="password" value={formValues.password} onChange={handleChange} required={true}></input>
              </div>
            }

            {!passwordError &&
              <div className="input-group mb-3">
                <span className="input-group-text">Re-type Password</span>
                <input className="form-control" type="password" name="passwordCheck" value={formValues.passwordCheck} onChange={handleChange} required={true}></input>
              </div>
            }
            {passwordError &&
              <div className="input-group mb-3">
                <span className="input-group-text">Re-type Password</span>
                <input className="form-control is-invalid" type="password" name="passwordCheck" value={formValues.passwordCheck} onChange={handleChange} required={true}></input>
              </div>
            }

            <div className="form-check">
              <span className="form-check-label">Register as Educator</span>
              <input className="form-check-input" type="checkbox" name="staff" onChange={() => setStaff(!staff)} required={true}></input>
            </div>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-outline-dark" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="btn btn-outline-primary" onClick={handleSubmit}>
            Sign Up!
          </Button>
        </Modal.Footer>
      </Modal>
    </span>

  );

}

export default RegistrationForm;