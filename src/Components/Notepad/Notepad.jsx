import React, { useState, useEffect } from 'react';
import axios from "axios";

const Notepad = (props) => {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (props.studentInfo !== undefined) {
      setNotes(props.studentInfo.notepad_text)
    }
    else if (props.educatorInfo !== undefined) {
      setNotes(props.educatorInfo.notepad_text)
    }
  }, [props.studentInfo, props.educatorInfo])

  function submit() {
    debugger
    updateNotes(notes);
  }

  async function updateNotes(notes) {
    if (props.studentInfo !== undefined) {
      const jwt = localStorage.getItem("token");
      await axios({
        method: "put",
        url: `http://127.0.0.1:8000/api/assignment/savenotes/user_id/${props.userInfo.id}/`,
        headers: { Authorization: 'Bearer ' + jwt },
        data: {
          school_id: props.studentInfo.school_id,
          notepad_text: notes
        }
      }).then(response => {
        window.location.reload();
      })
    }
    else if (props.educatorInfo !== undefined) {
      const jwt = localStorage.getItem("token");
      await axios({
        method: "put",
        url: `http://127.0.0.1:8000/api/assignment/savenotes/user_id/${props.userInfo.id}/`,
        headers: { Authorization: 'Bearer ' + jwt },
        data: {
          employee_id: props.educatorInfo.employee_id,
          notepad_text: notes
        }
      }).then(response => {
        window.location.reload();
      })

    }
  }

  return (
    <form onSubmit={submit} style={{ 'marginTop': '1em' }}>
      <div className="form-outline mb-4">
        <label className="form-label">Notes:</label>
        <button type='submit' className='btn btn-link' style={{ 'marginLeft': '80%' }}>Save</button>
        <textarea className="form-control text-area text-box multi-line w-100" value={notes} onChange={(event) => setNotes(event.target.value)} rows="7"></textarea>
      </div>
    </form>
  );

}

export default Notepad;