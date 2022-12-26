import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStore } from "../../app/store";
import swal from "sweetalert";

const Notepad = (props) => {
  const userInfo = useStore((state) => state.userInfo);
  const studentInfo = useStore((state) => state.studentInfo);
  const educatorInfo = useStore((state) => state.educatorInfo);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (studentInfo) {
      setNotes(studentInfo.notepad_text);
    } else if (educatorInfo) {
      setNotes(educatorInfo.notepad_text);
    }
  }, [studentInfo, educatorInfo]);

  function submit(event) {
    event.preventDefault();
    let dataToSave;
    if (studentInfo) {
      dataToSave = { schood_id: studentInfo.schood_id, notepad_text: notes };
    } else {
      dataToSave = {
        employee_id: educatorInfo.employee_id,
        notepad_text: notes,
      };
    }
    updateNotes(dataToSave);
  }

  async function updateNotes(notes) {
    const token = localStorage.getItem("token");
    await axios({
      method: "put",
      url: `assignment/savenotes/user_id/${userInfo.id}/`,
      headers: { Authorization: "Bearer " + token },
      data: notes,
    }).then((response) => {
        console.log('saved')
    }).catch((error) => {
        swal({
          title: "Oops something went wrong!",
          text: error.message,
          icon: "error",
        });
      });
  }

  return (
    <form onSubmit={submit} style={{ marginTop: "1em" }}>
      <div className="form-outline mb-4">
        <label className="form-label">Notes:</label>
        <button type="submit" className="btn btn-link" style={{ marginLeft: "80%" }}>Save</button>
        <textarea className="form-control text-area text-box multi-line w-100" value={notes || ''} onChange={(event) => setNotes(event.target.value)} rows="7"></textarea>
      </div>
    </form>
  );
};

export default Notepad;
