import React, { useState , useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from 'axios';

function App() {

  //? All the notes created till now
  const [notes, setNotes] = useState([]);

  function fetchNotes(){
    console.log('fetchNotes')
    axios.get('http://localhost:5000/notes/')
    .then(response =>{
      setNotes(response.data );
    })
    .catch(err=>console.log(err));
  }
  useEffect(()=>{

    fetchNotes();
    console.log('useEffect')
    // axios.get('http://localhost:5000/notes/')
    // .then(response =>{
    //   setNotes(response.data );
    // })
    // .catch(err=>console.log(err));
  },[notes]);




  //* add new note in notes array
  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  //* delete a particular note
  function deleteNote(id) {
    axios.delete('http://localhost:5000/deleteNote/'+ id)
    .then((response)=> console.log('note deleted ' + response))
    .catch(err=>console.log(err));
    
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem) => {
        return noteItem.id !== id;
      });
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
