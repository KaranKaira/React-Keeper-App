import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import CreateArea from './CreateArea';
import axios from 'axios';

function App() {
  //? All the notes created till now
  const [notes, setNotes] = useState([]);

  //? this method is called when a note is created or deleted because the state is changed after doing these operations 
  //? and new data from database is needed

  function fetchNotes() {
    axios
      .get('http://localhost:5000/notes/')
      .then((response) => {
        setNotes(response.data);
        // console.log(response.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchNotes(); //? first time load all notes 
    // console.log('useEffect');
  }, []);

  //* add new note in notes array
  function addNote() {
    fetchNotes();
  }

  //* delete a particular note
  function deleteNote(id) {

    axios.delete('http://localhost:5000/delete/' + id).then((res) => {
      fetchNotes(); //? fetch updated array of notes after deleteing this one
      // console.log(res)
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index} //* for react to render components efficiently
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
