import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useForm from "../CustomHooks/useForm";

const LoginForm = (props) => {

    const { formValues, handleChange, handleSubmit } = useForm(login);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  function login() {
    props.login(formValues.username, formValues.password);
  }

  return (
    <span id="log-in">
      <Button variant="btn btn-outline-primary" onClick={handleShow} style={{ "marginLeft": "6em" }}>
        Log In
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <span className="input-group-text">Username</span>
              <input className="form-control" type="text" name="username" value={formValues.username} onChange={handleChange}></input>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">Password</span>
              <input className="form-control" type="password" name="password" value={formValues.password} onChange={handleChange}></input>
            </div>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-outline-dark" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="btn btn-outline-primary" onClick={handleSubmit}>
            Log In
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  );

}

export default LoginForm;