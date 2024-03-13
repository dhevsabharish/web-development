import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import axios from "axios";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    noteKeyId: Date.now(),
  });  

  const [isFocused, setIsFocused] = useState(false);

  function expand() {
    setIsFocused(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    props.onAdd(note);
    axios.post(`http://localhost:5000/notes`, note);
    setNote({
      title: "",
      content: "",
      noteKeyId: Date.now(),
    });
  }

  return (
    <div>
      <form className="create-note">
        {isFocused && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isFocused ? 3 : 1}
          onFocus={expand}
        />
        <Zoom in={isFocused}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
