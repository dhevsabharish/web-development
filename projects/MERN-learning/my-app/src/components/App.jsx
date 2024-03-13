import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }
  useEffect(() => {
    axios
      .get("http://localhost:5000/notes")
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function deleteNote(id) {
    axios.delete(`http://localhost:5000/notes/${id}`).then(() => {
      setNotes((prevNotes) => {
        return prevNotes.filter((note) => note.noteKeyId !== id);
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        const { noteKeyId, title, content } = noteItem;
        return (
          <Note
            key={noteKeyId}
            id={noteKeyId}
            title={title}
            content={content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
